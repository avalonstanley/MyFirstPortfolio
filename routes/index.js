var express = require('express');
var router = express.Router();//invokes function from express

/* GET home page. */
router.get('/', home);
router.get('/about', about);
router.get('/projects', projects);

function home (req, res, next) {
  //instead of sending a message --> rendering a page passing 2 parameters 
  //1. name of view template want to use to create the page 
  //2. json object--> sets values to page
  res.render(
    'index', { title: 'Express', userName: 'Avalon' });
};


function about (req, res, next) {
  res.render(
    'index', { title: 'About', userName: 'Avalon' });
};

function projects (req, res, next) {
  res.render(
    'index', { title: 'Projects', userName: 'Avalon' });
};

module.exports = router;
