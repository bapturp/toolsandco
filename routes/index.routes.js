const express = require("express");
const exposeUserInfo = require("../middleware/exposeUserInfo");
const router = express.Router();
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");

/* GET home page */
router.use("/tools", require("./tools.routes"));
router.use("/reservation", require("./reservation.routes"));
router.use("/search", require("./search.routes"));
router.get("/", exposeUserInfo, async (req, res, next) => {
  const tooltypesList = await Tooltype.find()
  const usecasesList = await Usecase.find()
  res.render("index", { isHome: true, tooltypesList, usecasesList });
});

module.exports = router;
