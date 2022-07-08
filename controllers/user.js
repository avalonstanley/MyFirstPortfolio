// Student: Avalon Stanley
// StudentId: 300849734
// Date: July 06, 2022


let User = require('../models/user');
let passport = require('passport');


//Deals with Errors--------------------------------------------------------
function getErrorMessage(err) {
  console.log("===> Error: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

//Brings up Sign-up page--------------------------------------------------------
module.exports.renderSignup = function(req, res, next) {
  if (!req.user) {

    // creates a empty new user object.
    let newUser = User();

    res.render('authenticate/signup', {
      title: 'Sign-up Form',
      heading: 'SIGN-UP',
      messages: req.flash('error'),
      user: newUser
    });

  } else {
    return res.redirect('/home');//if already signed in, redirects to root of application
  }
};


//Process new sign-up--------------------------------------------------------
module.exports.signup = function(req, res, next) {
  if (!req.user && req.body.password === req.body.password_confirm) {
    console.log(req.body);

    let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        req.flash('error', message);
        return res.render('authenticate/signup', {
          title: 'Sign-up Form',
          heading: 'SIGN-UP',
          messages: req.flash('error'),
          user: user
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/users/list');
      });
    });
  } else {
    return res.redirect('/home');
  }
};

//Brings up Login page--------------------------------------------------------
module.exports.renderLogin = function(req, res, next) {
  if (!req.user) {
    res.render('authenticate/login', {
      title: 'Login',
      heading: 'LOGIN',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    console.log(req.user);
    return res.redirect('/authenicate/signup');
  }
};

//Authenticate--------------------------------------------------------
module.exports.login = function(req, res, next){
  passport.authenticate('local', {   
    successRedirect: req.session.url || '/users/list',
    failureRedirect: '/users/signup',
    failureFlash: true
  })(req, res, next);
  delete req.session.url;
}

//Render logout page--------------------------------------------------------
module.exports.signout = function(req, res, next) {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/home");
  });
};




// Gets all contacts/users from the Database and renders the page to list them all.
module.exports.contactList = function(req, res, next) {  
  User.find({}, null, {sort: {username: 1}}, (err, contactsList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.render(
              'users/list', 
              {
              title: 'List of Contacts',
              heading: 'Business Contacts', 
              ContactsList: contactsList,
              userName: req.user ? req.user.username : ''
          })            
      }
  });
}


// Renders the Update form using the update.ejs template
module.exports.displayUpdatePage = (req, res, next) => {
    
  let id = req.params.id; 

  User.findById(id, (err, contactToUpdate) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the update view
          res.render('users/update', {
            title: 'Update Contact Information',
            heading: 'UPDATE',
            contact: contactToUpdate
        })
      }
  });
}

// Processes the data submitted from the Update form to update the contact
module.exports.processUpdatePage = (req, res, next) => {
    
  let id = req.params.id

  //REQUEST
  let updatedContact = User({
      _id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password      
  });

  //RESPOND
  User.updateOne({_id: id}, updatedContact, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.redirect('/users/list'); //  <------------------- '/users/list' ???
      }
  });
  
}


// Deletes a Contact based on its id.
module.exports.deleteContact = (req, res, next) => {
    
  let id = req.params.id;

  User.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/users/list'); //  <------------------- '/users/list' ???
      }
  });

}