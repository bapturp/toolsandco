const express = require("express");
const exposeUserInfo = require("../middlewares/exposeUserInfo");
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
  const tooltypesList = await Tooltype.find();
  const usecasesList = await Usecase.find();
  res.render("index", { isHome: true, tooltypesList, usecasesList });
});

module.exports = router;
