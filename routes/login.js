var express = require("express");
var User = require("../models/userModel");
const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

var router = express.Router();

const rejectionResponse = "Invalid username or password";

/* GET login. */
router.post("/", async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(401).send(rejectionResponse);
  } else {
    //res.send("mario");
    try {
      var user = await User.findOne({ where: { email: email } });
      console.log(user);
      if (!user) {
        res.status(200).send(rejectionResponse);
      } else {
        const hashWordArray = SHA256(password);
        const hashString = hashWordArray.toString();

        if (hashString === user.password) {
          jwtPayload = {
            email: req.body.email,
            id: user.id,
          };
          console.log(jwtPayload);
          const JWT = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
            expiresIn: "18000s",
          });
          res.json(JWT);
        } else {
          res.send(rejectionResponse);
        }
      }
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = router;
