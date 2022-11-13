const express = require("express");
const router = express.Router();

/* GET home page */
router.use("/tools", require("./tools.routes"));
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
