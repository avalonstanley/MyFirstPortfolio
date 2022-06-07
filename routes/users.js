var express = require('express');
var router = express.Router();

/* GET users listing. */

//display something in root of this route
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//gives /user/ava page the same view/template
router.get('/show', showUser) ;

function showUser (req, res, next) {
  //instead of sending a message --> rendering a page passing 2 parameters 
  // 1. name of view template want to use to create the page 
  // 2. json object--> sets values to page
  res.render(
    'users', { title: 'Express', userName: 'User' });
};



module.exports = router;
