const express = require("express");
const exposeUserInfo = require("../middlewares/exposeUserInfo");
const Tool = require("../models/Tool.model");
const router = express.Router();
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");

/* GET home page */
router.use("/tools", exposeUserInfo, require("./tools.routes"));
router.use("/reservation", exposeUserInfo, require("./reservation.routes"));
router.use("/search", exposeUserInfo, require("./search.routes"));
router.use("/profile", exposeUserInfo, require("./profile.routes.js"));

router.use("/cart", exposeUserInfo, require("./cart.routes"));

router.get("/", exposeUserInfo, async (req, res, next) => {
  try {
    const toolsList = await Tool.find().sort({ _id: -1 })
      .limit(4).populate('tool_type use_case')
    const tooltypesList = await Tooltype.find();
    const usecasesList = await Usecase.find();
    res.render("index", { isHome: true, tooltypesList, usecasesList, toolsList });
  } catch (error) {
    return next(error)
  }
});

module.exports = router;
