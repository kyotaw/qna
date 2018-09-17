'use strict';

const Router = require('express').Router
    , userController = require('./controllers/user_controller')
    , authController = require('./controllers/auth_controller')
    , siteController = require('./controllers/site_controller')
    , authFilter = require('./middlewares/auth_filter')
    , errors = require('./errors')
    , shortcut = require('./controllers/response_shortcuts');

function routes() {
    const root = '/api/';
    let router = Router();
    
    // require authentication    
    const authenticate = authFilter.authenticateWithJwt();

    // auth
    const auth = root + 'auth/';
    router.post(auth + 'signup/', authController.createUnauthUser);
    router.get(auth + 'login/', authController.login);
    router.get(auth + 'loggedin/', authController.loggedIn);
    //router.get(auth + 'google/login', socialLogin.authenticateByGoogle());
    //router.get(auth + 'google/callback', socialLogin.callbackFromGoogle(), siteController.loggedin);
    
    // users
    const users = root + 'users/';
    router.post(users + 'certification/', userController.create);
    router.delete(users + ':userId', authenticate, userController.delete);
    const password = users + 'password/';
    router.put(password, authenticate, userController.updatePassword);

    // error
    router.use((err, req, res, next) => {
        res.status(err.status || 500);
        if (err instanceof errors.KairaiError) {
            shortcut.errorResponse(res, err);
        } else {
            next(err);
        }
    });

    return router;
}

module.exports = routes;
