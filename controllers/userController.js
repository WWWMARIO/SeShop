const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const { SHA256 } = require('crypto-js');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

exports.user_list = (req, res /* , next */) => {
  User.findAll().then(
    (users) => {
      res.send(users);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.user_create_post = [
  // Validate fields.
  body('firstName').isLength({ min: 1 }).trim().isString(),
  body('lastName').isLength({ min: 1 }).trim().isString(),
  body('email').isLength({ min: 1 }).trim().isEmail(),
  body('address').isLength({ min: 1 }).trim().isString(),
  body('phoneNumber').isLength({ min: 6 }).trim().isAlphanumeric(),
  body('password').isLength({ min: 6 }).trim().isString(),

  // Sanitize fields.
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
  sanitizeBody('email').normalizeEmail().escape(),
  sanitizeBody('address').escape(),
  sanitizeBody('phoneNumber').escape(),
  sanitizeBody('password').escape(),

  // Process request after validation and sanitization.
  async (req, res /* , next */) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.

      res.send(errors.array());
    } else {
      // Data from form is valid.
      const hashWordArray = SHA256(req.body.password);
      const hashString = hashWordArray.toString();

      // Create an Author object with escaped and trimmed data.
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        password: hashString,
      };

      const exixtingUser = await User.findOne({ where: { email: req.body.email } });
      if (exixtingUser) {
        res.status(400).send('User with e-mail already exists');
      }

      User.create(newUser)
        .then((respUser) => {
          res.status(201).send(respUser);
        })
        .catch((error) => {
          console.log(error)
          res.status(400).send(error);
        });
    }
  },
];

exports.user_details = (req, res /* , next */) => {
  // User.findAll({
  //   where: { id: req.params.id },
  //   include: [Order],
  // //   include:{ all: true, nested: true }
  // })
  User.findByPk(req.params.id, { include: [Order] })
    .then((user) => {
      if (!user) {
        res.status(200).send('Not found');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.user_delete_delete = async (req, res /* , next */) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        res.status(200).send('Not found');
      }
      console.log(deleted);
      res.status(200).send('Deleted');
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error.errors);
    });
};

exports.user_update_put = [
  body('firstName').isLength({ min: 1 }).trim(),
  body('lastName').isLength({ min: 1 }).trim(),
  body('email').isLength({ min: 1 }).trim().isEmail(),
  body('address').isLength({ min: 1 }).trim(),
  body('phoneNumber').isLength({ min: 1 }).trim(),
  // body("password").isLength({ min: 6 }).trim().isAlphanumeric(),

  // Sanitize fields.
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
  sanitizeBody('email').normalizeEmail().escape(),
  sanitizeBody('address').escape(),
  sanitizeBody('phoneNumber').escape(),
  // sanitizeBody("password").escape(),

  async (req, res /* , next  */) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send(errors.array());
    } else {
      try {
        const userToUpdate = await User.findByPk(req.body.id);

        if (!userToUpdate) {
          res.status(200).send('Not found');
        } else {
          const resp = await userToUpdate.update(req.body);
          res.status(200).send(resp);
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
  },
];
