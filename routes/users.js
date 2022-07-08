let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

// Sign-up
router.get('/signup', usersController.renderSignup);//render
router.post('/signup', usersController.signup);//process

// Login
router.get('/login', usersController.renderLogin);//render
router.post('/login', usersController.login);//process

// Logout
router.get('/logout', usersController.signout);//render

//List
router.get('/list', usersController.contactList);

//Update
router.get('/update/:id', requireAuth, usersController.displayUpdatePage);
router.post('/update/:id', requireAuth, usersController.processUpdatePage);

//Delete
router.get('/delete/:id', requireAuth, usersController.deleteContact);

// Function --> Only Authenticated Users Restriction-----------------------------------------------------------------
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()){
       return res.redirect('/users/login');//redirect the user to the '/users/login' page
    }
    next();  
}


module.exports = router;
