const jwt = require('jsonwebtoken');

exports.authenticateAdmin = (req, res, next) => {
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
    // req.user = user;
    if (user.role === 'admin') {
      return next(); // pass the execution off to whatever request the client intended
    }
    return res.sendStatus(403);
  });
}

exports.authenticateRegisteredUser = (req, res, next) => {
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
    // req.user = user;

    if (user.role === 'admin' || user.role === 'guest') {
      return next(); // pass the execution off to whatever request the client intended
    }
    return res.sendStatus(403);
  });
}