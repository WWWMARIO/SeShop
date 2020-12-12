const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

const Item = require('../models/itemModel');

exports.item_list = async (req, res /* , next */) => {
  // res.send('pozdrav');
  Item.findAll().then(
    (items) => {
      res.send(items);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.item_create_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim(),
  body('price').isLength({ min: 1 }).trim().isNumeric(),
  body('description').isLength({ min: 1 }).trim(),
  body('picture').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('name').escape(),
  sanitizeBody('price').escape(),
  sanitizeBody('description').escape(),
  // sanitizeBody('picture').escape(),

  // Process request after validation and sanitization.
  async (req, res /* , next */) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.

      res.send(errors.array());
    } else {
      // Data from form is valid.
      // Create an Item object with escaped and trimmed data.
      const item = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        picture: req.body.picture,
      };

      Item.create(item)
        .then((respItem) => res.status(201).send(respItem))
        .catch((error) => {
          res.status(400).send(error.errors);
        });
    }
  },
];

exports.item_details = (req, res /* , next */) => {
  Item.findByPk(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(200).send('Not found');
      }
      res.status(200).send(item);
    })
    .catch((error) => {
      res.status(400).send(error.errors);
    });
};

exports.item_delete_delete = async (req, res /* , next */) => {
  Item.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        res.status(200).send({ response: 'Not found' });
      }
      res.status(200).send({ response: 'Deleted' });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.item_update_put = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim(),
  body('price').isLength({ min: 1 }).trim().isNumeric(),
  body('description').isLength({ min: 1 }).trim(),
  body('picture').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('name').escape(),
  sanitizeBody('price').escape(),
  sanitizeBody('description').escape(),
  // sanitizeBody('picture').escape(),
  // sanitizeBody("password").escape(),

  async (req, res /* , next  */) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send(errors.array());
    } else {
      try {
        const itemToUpdate = await Item.findByPk(req.body.id);

        if (!itemToUpdate) {
          res.status(200).send('Not found');
        } else {
          const resp = await itemToUpdate.update(req.body);
          res.status(200).send(resp);
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
  },
];
