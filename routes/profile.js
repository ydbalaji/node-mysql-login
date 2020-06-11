var express = require('express');
const authController = require('../controllers/auth');
var router = express.Router();

/* GET users listing. */

router.get('/', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render('profile', {
      user: req.user,
      title: 'Profile'
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
