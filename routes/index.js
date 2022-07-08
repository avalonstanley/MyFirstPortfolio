// File name: MyFirstPortfolio
// Name: Avalon Stanley
// Student Id: 300 849 734
// Date: June 6, 2022

var express = require('express');
var router = express.Router();//invokes function from express


router.get('/', landing);
router.get('/home', home);
router.get('/about', about);
router.get('/projects', projects);
router.get('/services', services);
router.get('/contact', contact);


function landing (req, res, next) {
  res.render(
    'landing', 
  {
    title: 'Landing'
  });
};


function home (req, res, next) {
  console.log('===> Original URL: ' + req.session.url);
  res.render(
    'home', 
    { 
      title: 'Home', 
      userName: req.user ? req.user.username:''
    });
};

function about (req, res, next) {
  res.render(
    'about', 
    { 
      title: 'About',
      userName: req.user ? req.user.username:''
    });
};


function projects (req, res, next) {
  res.render(
    'projectsServices', 
    { 
      title: 'Projects', 
      heading: 'Check out some of my latest projects...',
      div1Link: '#',
      div1: '/images/PigsFly.pdf',
      div1Name: 'Client Brief (MKTG)',
      div1Text: 'Meet with a client from Virgin Mobile, and put together a brief and proposal which I then presented to them. They were incredibly happy, and actually decided to move forward.',
      div2Link: 'http://studentweb.cencol.ca/astanle5/Protected%20areas%20Assignment%202/index/ProtectedAreas.html',
      div2: '/images/ProtectedAreasAssignment.JPG',
      div2Name: 'Protected Areas Assignment',
      div2Text: 'First semester of school, was given an simple directive to create a website that proved research was conducted on the protected areas of the world. This was my very first website.',
      div3Link: 'http://studentweb.cencol.ca/astanle5/Assignment%203/ProductPage.html',
      div3: '/images/CanadaGooseProductPage.JPG',
      div3Name: 'Canada Goose Product Page',
      div3Text: 'Another assignment in my first semester was to put together a product page displaying at least 2 products, logo, pop-up windows that have additional photos and a responsive map. ',
      div4Link: 'http://studentweb.cencol.ca/astanle5/Week11Project/home.html',
      div4: '/images/RealtorPageProject.JPG',
      div4Name: "Realtor's Personal Website",
      div4Text: 'Yet another assignment was given in which I was tasked with creating a logo, branding, and functional website to showcase a realtor (fictional), and his/her listings.',
      userName: req.user ? req.user.username:''
    });
};


function services (req, res, next) {
  res.render(
    'projectsServices', 
    { 
      title: 'Services', 
      heading: "Some of the services I hope to offer soon...",
      div1Link: '/contact',
      div1: '/images/webdev.png',
      div1Name: 'General Programming',
      div1Text: '',
      div2Link: '/contact',
      div2: '/images/webdev1.png',
      div2Name: 'Web Development',
      div2Text: '',
      div3Link: '/contact',
      div3: '/images/mobile.png',
      div3Name: 'Mobile Apps',
      div3Text: '',
      div4Link: '/contact',
      div4: '/images/sql.png',
      div4Name: "SQL Development",
      div4Text: '',
      userName: req.user ? req.user.username:''
    });
};

function contact (req, res, next) {
  res.render(
    'contact', 
    { 
      title: 'Contact', 
      heading: 'Give me a shout.',
      userName: req.user ? req.user.username:''
    });
};


module.exports = router;
