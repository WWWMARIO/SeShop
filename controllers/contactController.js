const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const Contact = require('../models/contactModel');

exports.contact_create_post = [
  // Validate fields.
  body('email').isLength({ min: 1 }).trim(),
  body('message').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('email').escape(),
  body('message').isLength({ min: 1 }).trim(),

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
      const contact = {
        email: req.body.email,
        message: req.body.message,
      };

      Contact.create(contact)
        .then((respItem) => res.status(201).send(respItem))
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  },
];

exports.contact_list = async (req, res /* , next */) => {
  // res.send('pozdrav');
  Contact.findAll().then(
    (contacts) => {
      res.send(contacts);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.contact_delete_delete = async (req, res /* , next */) => {
  Contact.destroy({
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
