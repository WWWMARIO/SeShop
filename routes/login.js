const express = require('express');
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

const rejectionResponse = 'Invalid username or password';

/* GET login. */
router.post('/', async (req, res /* , next */) => {
  const { email, password } = req.body;
  // const email = req.body.email;
  // const password = req.body.password;
  if (!email || !password) {
    res.status(401).send(rejectionResponse);
  } else {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(200).send(rejectionResponse);
      } else {
        const hashWordArray = SHA256(password);
        const hashString = hashWordArray.toString();

        if (hashString === user.password) {
          const jwtPayload = {
            email: req.body.email,
            id: user.id,
            role: user.role
          };
          const JWT = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
            expiresIn: '18000s',
          });
          res.json({
            email: user.email,
            id: user.id,
            role: user.role,
            token: JWT,
          });
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
