// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// Set up of cart and date inside req.session
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
        res.locals.cart = req.session.cart.length;
    }
    res.locals.cart = req.session.cart.length;

    if (!req.session.date) {
        req.session.date = { start: null, end: null };
    }

    res.locals.date = req.session.date;
    res.locals.cart = req.session.cart.length;
    next();
});

const exposeUserInfo = require('./middlewares/exposeUserInfo');

const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/admin', adminRoutes);

const checkoutRoutes = require('./routes/checkout.routes');
app.use('/checkout', checkoutRoutes);

const toolsRoutes = require('./routes/tools.routes');
app.use('/tools', exposeUserInfo, toolsRoutes);

const reservationRoutes = require('./routes/reservation.routes');
app.use('/reservation', exposeUserInfo, reservationRoutes);

const searchRoutes = require('./routes/search.routes')
app.use('/search', exposeUserInfo, searchRoutes);

const profileRoutes = require('./routes/profile.routes.js')
app.use('/profile', exposeUserInfo, profileRoutes);

const cartRoutes = require('./routes/cart.routes')
app.use('/cart', exposeUserInfo, cartRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
