const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");

router.get("/", async (req, res, next) => {
  const toolsList = await Tool.find();
  res.render("tools", { toolsList });
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const tool = await Tool.findById(id);
  res.render("tool", { tool });
});

router.get("/:id/addToCart", async (req, res, next) => {
  //const foundTool = await Tool.findById(req.params.id);
  const id = req.params.id;
  if (req.session.cart.includes(id)) {
    res.locals.cart = req.session.cart.length;
    return res.status(200).json(req.session.cart);
  }
  req.session.cart.push(id);
  res.locals.cart = req.session.cart.length;
  res.status(200).json(req.session.cart);
});

module.exports = router;
