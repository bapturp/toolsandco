const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");

router.get("/", async (req, res, next) => {
  const toolsList = req.session.cart;
  const reservedTools = await Tool.find({
    _id: {
      $in: toolsList,
    },
  });
  res.render("cart", { reservedTools });
});

router.get("/clear", (req, res, next) => {
  req.session.cart = [];
  res.redirect("/cart");
});

module.exports = router;
