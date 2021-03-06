const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const User = require('../models/userModel');

const Order = require('../models/orderModel');
const Item = require('../models/itemModel');
const OrderItem = require('../models/orderItemModel');

async function calculateTotal(order, res) {
  return order.reduce(async (total, orderItem) => {
    let item;
    try {
      item = await Item.findByPk(orderItem.itemId);
      if (!item) {
        res.status(400).send({ error: 'Item Not found' });
      }
    } catch (err) {
      res.status(400).send(err);
    }
    // total is promise, needs to be awaited
    return (await total) + item.price * orderItem.amount;
  }, 0);
}

exports.order_create_post = [
  // Validate fields.
  body('userId').isLength({ min: 1 }).trim().isNumeric(),

  // Sanitize fields.
  sanitizeBody('userId').escape(),

  // Process request after validation and sanitization.
  async (req, res /* , next */) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.

      res.send(errors.array());
    } else {
      try {
        const user = await User.findByPk(req.body.userId);
        if (!user) {
          res.status(400).send('User Not found');
        }

        const orderTotal = await calculateTotal(req.body.orderItems, res);
        if (orderTotal === 0) {
          res.status(400).send({ error: 'Calculation error' });
        }

        const newOrder = {
          userId: user.id,
          total: orderTotal,
        };

        const createdOrder = await Order.create(newOrder);

        req.body.orderItems.forEach(async (orderItem) => {
          const newOrderItem = {
            orderId: createdOrder.id,
            itemId: orderItem.itemId,
            amount: orderItem.amount,
          };
          await OrderItem.create(newOrderItem);
        });
      } catch (err) {
        res.status(400).send(err);
      } finally {
        res.status(201).send(req.body.orderItems);
      }
    }
  },
];

exports.order_list = (req, res /* , next */) => {
  // res.send('pozdrav');
  Order.findAll({
    include: [User, OrderItem /* , Item */],
    // include:{ all: true, nested: true }
    order: [['createdAt', 'DESC']],
  }).then(
    (orders) => {
      res.send(orders);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.order_list_for_user = (req, res /* , next */) => {
  Order.findAll({
    where: { userId: req.params.id },
    include: [User, OrderItem /* , Item */],
    // include:{ all: true, nested: true }
    order: [['createdAt', 'DESC']],
  }).then(
    (orders) => {
      res.send(orders);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.order_details = (req, res /* , next */) => {
  Order.findByPk(req.params.id, { include: [User] })
    .then((order) => {
      if (!order) {
        res.status(400).send({ error: 'Order not found' });
      }
      res.status(200).send(order);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
