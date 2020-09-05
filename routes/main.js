var router = require("express").Router();


router.get("/", function(req, res){
  res.render('main/home');
});

router.get("/about-us", function(req,res){
  res.render('main/aboutus');
});

module.exports = router;
