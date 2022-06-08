var express = require('express');
var router = express.Router();//invokes function from express

/* GET home page. */
router.get('/', landing);
router.get('/home', home);
router.get('/about', about);
router.get('/projects', projects);
router.get('/services', services);
router.get('/contact', contact);


function landing (req, res, next) {
  res.render(
    'landing', { title: 'Hello.', userName: 'Avalon' });
};

/* TO DO */
function home (req, res, next) {
  res.render(
    'home', { title: 'Home Page', userName: 'Avalon' });
};

function about (req, res, next) {
  res.render(
    'about', { title: 'About', userName: 'Avalon' });
};

/* TO DO */
function projects (req, res, next) {
  res.render(
    'projectsServices', { title: 'Projects', userName: 'Avalon' });
};

/* TO DO */
function services (req, res, next) {
  res.render(
    'projectsServices', { title: 'Projects', userName: 'Avalon' });
};

function contact (req, res, next) {
  res.render(
    'contact', { title: 'Projects', userName: 'Avalon' });
};

module.exports = router;
