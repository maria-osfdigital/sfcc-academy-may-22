// ===== intro

/**
 * 3 main files:
 *
 * 1st => xml file: responsible for defining the metadata information for the form
 * 2nd => controller: responsible for retrieving the metadata, send it to the template and render the template
 * 3rd => template: responsible for displaying the form itself
 *
 * the controller is the main of communication between the xml and the template
 */

'use strict';

var server = require('server');

/* get route: responsible for rendering the form's template */
server.get('Show', function(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');

    /* retrieving form metadata using forms framework method, passing the xml file name as parameter */
    var registerForm = server.forms.getForm('userregister');
    registerForm.clear()

    /* rendering template, sending form metadata and url to the post route (UserRegister-Registration) */
    res.render('register/registerform', {
        registerForm: registerForm,
        actionUrl: URLUtils.url('UserRegister-Registration').toString()
    });
    return next();
});

/**
 * post route:
 * triggered by the form's submit;
 * responsible for retrieving the form fields filled in and to manage the info sent by the user
 */
server.post('Registration', function(req, res, next) {
    /* retrieving the form again, this time it will be fill in with user's information */
    var registerForm = server.forms.getForm('userregister');

    /**
     * declaring and filling in object with the values inside the "registerForm";
     * using the ".value" attribute to retrieve the content from each field
     */
    var userData = {
        userFirstName: registerForm.userinfo.firstnameuser.value,
        userLastName: registerForm.userinfo.lastnameuser.value,
        userEmail: registerForm.userinfo.emailuser.value,
        userPhone: registerForm.userinfo.phoneuser.value
    }

    /* rendering the template responsible for displaying user's profile, sending object with user's information */
    res.render('register/registration', {
        userData: userData
    });
    return next();
});

module.exports = server.exports();