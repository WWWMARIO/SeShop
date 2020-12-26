const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const Category = require('../models/categoryModel');

exports.category_create_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('name').escape(),

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
      const category = {
        name: req.body.name,
      };

      Category
        .create(category)
        .then((respItem) => res.status(201).send(respItem))
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  },
];


exports.category_list = async (req, res /* , next */) => {
  // res.send('pozdrav');
  Category.findAll().then(
    (categories) => {
      res.send(categories);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.category_delete_delete = async (req, res /* , next */) => {
  Category.destroy({
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


exports.category_update_put = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('name').escape(),

  async (req, res /* , next  */) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send(errors.array());
    } else {
      try {
        const itemToUpdate = await Category.findByPk(req.body.id);

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