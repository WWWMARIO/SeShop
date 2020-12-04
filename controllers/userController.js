var User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const { SHA256 } = require("crypto-js");

exports.user_list = function (req, res, next) {
  User.findAll().then(
    function (users) {
      res.send(users);
    },
    (error) => {
      res.send(error);
    }
  );
};

exports.user_create_post = [
  // Validate fields.
  body("firstName").isLength({ min: 1 }).trim().isAlphanumeric(),
  body("lastName").isLength({ min: 1 }).trim().isAlphanumeric(),
  body("email").isLength({ min: 1 }).trim().isEmail(),
  body("address").isLength({ min: 1 }).trim().isAlphanumeric(),
  body("phoneNumber").isLength({ min: 6 }).trim().isAlphanumeric(),
  body("password").isLength({ min: 6 }).trim().isAlphanumeric(),

  // Sanitize fields.
  sanitizeBody("first_name").escape(),
  sanitizeBody("lastName").escape(),
  sanitizeBody("email").normalizeEmail().escape(),
  sanitizeBody("address").escape(),
  sanitizeBody("phoneNumber").escape(),
  sanitizeBody("password").escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.

      res.send(errors.array());
      return;
    } else {
      // Data from form is valid.
      const hashWordArray = SHA256(req.body.password);
      const hashString = hashWordArray.toString();

      // Create an Author object with escaped and trimmed data.
      var newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        password: hashString,
      };
      console.log(newUser);

      User.create(newUser)
        .then((user) => res.status(201).send(user))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error.errors);
        });
    }
  },
];

exports.user_details = function (req, res, next) {
  /* User.findById(req.params.id)
    .populate("user")
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (user == null) {
        // No results.
        var err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.send(user);
    }); */

  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(200).send("Not found");
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error.errors);
    });
};

/* exports.user_delete_delete = function (req, res, next) {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        res.status(200).send("Not found");
      }
      console.log(deleted);
      res.status(200).send("Deleted");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error.errors);
    });  
}; */

exports.user_delete_delete = async function (req, res, next) {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        res.status(200).send("Not found");
      }
      console.log(deleted);
      res.status(200).send("Deleted");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error.errors);
    });
};

exports.user_update_put = [
  body("firstName").isLength({ min: 1 }).trim().isAlphanumeric(),
  body("lastName").isLength({ min: 1 }).trim().isAlphanumeric(),
  body("email").isLength({ min: 1 }).trim().isEmail(),
  body("address").isLength({ min: 1 }).trim().isAlphanumeric(),
  body("phoneNumber").isLength({ min: 6 }).trim().isAlphanumeric(),
  //body("password").isLength({ min: 6 }).trim().isAlphanumeric(),

  // Sanitize fields.
  sanitizeBody("first_name").escape(),
  sanitizeBody("lastName").escape(),
  sanitizeBody("email").normalizeEmail().escape(),
  sanitizeBody("address").escape(),
  sanitizeBody("phoneNumber").escape(),
  //sanitizeBody("password").escape(),

  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send(errors.array());
      return;
    } else {
      try {
        var userToUpdate = await User.findByPk(req.body.id);

        if (!userToUpdate) {
          res.status(200).send("Not found");
        } else {
          var resp = await userToUpdate.update(req.params);
          res.status(200).send(resp);
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
    /* User.findByIdAndUpdate(
        req.params.id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
        { new: true }
      ).exec(function (err, user) {
        if (err) {
          return next(err);
        }
        if (user == null) {
          // No results.
          var err = new Error("User not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        res.send(user);
      }); */
  },
];
