var express = require('express');
const authController = require('../controllers/auth');
var router = express.Router();

/* GET users listing. */

router.get('/', authController.isLoggedIn, function(req, res, next) {
  if (req.user) {
    res.redirect("/profile");
  } else {
    res.render("login", { title: 'Login' });
  }
});

module.exports = router;
