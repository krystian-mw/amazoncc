const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();


// serialize and deserializ

passport.serializeUser(function (user, done) {

  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  user.findById(id, function(err, user) {
    done(err, user);
  });
});


//middlewre

passport.use('local-login', new LocalStrategy({
usernameField: 'email',
passwordField: 'password',
passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({ email: email }, function(err, user){
    if (err) return done(err);
    if (!user) {
      return done(null, false, req.flash("loginMessage", "no user has bee found"));
}
if (!user.comparePassword(password)) {
  return done (null, false, req.flash("loginMessage", "Password is wrong"));
 }

return done(err, user);
});
}));





//Custom Function to Validiate

exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
