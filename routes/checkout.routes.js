const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');

const Tool = require('../models/Tool.model');
const Reservation = require('../models/Reservation.model');
const exposeUserInfo = require('../middlewares/exposeUserInfo');

router.get('/', isLoggedIn, exposeUserInfo, async (req, res) => {
    try {
        // Check if the cart is not empty
        if (req.session.cart.length !== 0) {
            const startDate = new Date(req.session.date.start);
            const endDate = new Date(req.session.date.end);
            // Get the length of the reservation
            const daysReserved =
                (endDate.getTime() - startDate.getTime()) / 86400000 + 1;
            const toolsList = req.session.cart;
            const reservedTools = await Tool.find({
                _id: {
                    $in: toolsList,
                },
            }).populate('use_case');
            //Get all the prices/day of the different tools in the cart
            const prices = reservedTools.map((tool) => {
                return tool.price_per_day;
            });
            // Sum the prices and multiply by the length of the reservation to get total price
            const totalPrice =
                prices.reduce((acc, price) => {
                    return acc + price;
                }) * daysReserved;
            req.session.totalPrice = totalPrice;
            // console.log(reservedTools);
            return res.render('checkout', { reservedTools, totalPrice });
        } else {
            return res.render('checkout');
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', exposeUserInfo, isLoggedIn, async (req, res, next) => {
    try {
        const tools = req.session.cart;
        const start_date = req.session.date.start;
        const end_date = req.session.date.end;
        const user = req.session.currentUser._id;

        for (tool of tools) {
            await Reservation.create({ start_date, end_date, tool, user });
        }
        req.session.cart = [];
        res.locals.cart = req.session.cart.length;
        req.session.date.start = null;
        req.session.date.end = null;

        return res.render('checkout-confirmation');
    } catch (error) {
        next(error);
    }
});

router.get('/cancel', (req, res, next) => {
    req.session.cart = [];
    res.redirect('/');
});

module.exports = router;
