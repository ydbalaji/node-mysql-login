var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
/* GET home page. */
router.get('/', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  res.render('index', {
    user: req.user,
    title: 'Home'
  });
});

module.exports = router;
