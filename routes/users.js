var router = require("express").Router();
var User = require('../models/user')
var passport = require('passport');
var passportConf = require("../config/passport")



router.get('/login', function(req, res) {
  if (req.user) return res.redirect("/");
  res.render('accounts/login', {message: req.flash('loginMessage')})
});

router.post("/login", passport.authentication('local-login', {
  successRedirect: '/profile',
  failureRedirect: "/login",
  failureFlesh: true
}))







router.get("/signup", function(req, res, next) {
      res.render("accounts/signup", {
          errors: req.flash('errors')
      })});

    router.post("/signup", function(req, res, next) {

      var user = new User();
      user.profile.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
    User.findOne({
        email: req.body.email
      }, function(err, existingUser) {
        console.log(existingUser);
        if (existingUser) {
          req.flash('errors', 'account with this email already exist');
          return res.redirect("/signup");
        } else {
          user.save(function(err, user) {
            if (err) return next(err);
          return  res.redirect("/");
        });
        }
    });
});


    module.exports = router;
