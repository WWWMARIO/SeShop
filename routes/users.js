var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  } // if there isn't any token
  console.log(token);
  console.log(process.env.TOKEN_SECRET);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    console.log(user);
    if (err) {
      return res.sendStatus(403);
    } else {
      console.log(user);
      req.user = user;
      console.log(user);
      next(); // pass the execution off to whatever request the client intended
    }
  });
}

router.get("/", authenticateToken, userController.user_list);
router.post("/", authenticateToken, userController.user_create_post);
router.get("/:id", authenticateToken, userController.user_details);
router.delete("/:id", authenticateToken, userController.user_delete_delete);
router.put("/", authenticateToken, userController.user_update_put);

module.exports = router;
