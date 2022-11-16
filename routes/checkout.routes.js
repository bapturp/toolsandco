const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');

const Tool = require('./../models/Tool.model');

router.get('/', isLoggedIn, (req, res) => {
    res.render('checkout')
});

router.post('/', isLoggedIn, (req, res) => {
    res.render('checkout-confirmation');
});

module.exports = router;