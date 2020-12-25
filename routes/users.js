const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');

const router = express.Router();

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    // if there isn't any token
    return res.sendStatus(401);
  }
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    return next(); // pass the execution off to whatever request the client intended
  });
}

router.get('/:id', /* authenticateToken, */ userController.user_details);
router.get('/', /* authenticateToken, */ userController.user_list);
router.delete('/:id', /* authenticateToken, */ userController.user_delete_delete);
router.put('/', /* authenticateToken, */ userController.user_update_put);
// router.post('/', authenticateToken, userController.user_create_post);

module.exports = router;
