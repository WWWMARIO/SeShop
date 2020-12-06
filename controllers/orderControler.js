const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const User = require('../models/userModel');

const Order = require('../models/orderModel');
const Item = require('../models/itemModel');

async function calculateTotal(order, res) {
  return order.reduce(async (total, orderItem) => {
    let item;
    try {
      item = await Item.findByPk(orderItem.itemId);
      if (!item) {
        res.status(400).send('Item Not found');
      }
    } catch (err) {
      res.status(400).send(err);
    }
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
      let user;
      try {
        user = await User.findByPk(req.body.userId);
        if (!user) {
          res.status(400).send('User Not found');
        }
      } catch (err) {
        res.status(400).send(err);
      }
      let orderTotal;
      try {
        orderTotal = await calculateTotal(req.body.orderItems, res);
      } catch (err) {
        res.status(400).send(err);
      }
      // Data from form is valid.
      // Create an Item object with escaped and trimmed data.

      const newOrder = {
        userId: user.id,
        total: orderTotal,
      };

      let createdOrder;
      try {
        createdOrder = await Order.create(newOrder);
      } catch (err) {
        res.status(400).send(err);
      }

      try {
        req.body.orderItems.forEach((orderItem) => {});
      } catch (err) {
        res.status(400).send(err);
      }
      res.status(201).send(req.body.orderItems);

      /* Order.create(newOrder)
        .then((respItem) => {
          res.status(201).send(respItem);
          createdOrder = respItem;
        })
        .catch((error) => {
          res.status(400).send(error);
        }); */
    }
  },
];
