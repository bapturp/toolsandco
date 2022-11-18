const express = require('express');
const exposeUserInfo = require('../middlewares/exposeUserInfo');
const getActualUrl = require('../middlewares/getActualUrl');
const Tool = require('../models/Tool.model');
const router = express.Router();
const Tooltype = require('./../models/Tooltype.model');
const Usecase = require('./../models/Usecase.model');


router.get('/', getActualUrl, exposeUserInfo, async (req, res, next) => {
    try {
        const toolsList = await Tool.find()
            .sort({ _id: -1 })
            .limit(4)
            .populate('tool_type use_case');
        const tooltypesList = await Tooltype.find();
        const usecasesList = await Usecase.find();
        res.render('index', {
            isHome: true,
            tooltypesList,
            usecasesList,
            toolsList,
        });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
