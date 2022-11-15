const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");

// Render all the tools
router.get("/", async (req, res, next) => {
  try {
    const toolsList = await Tool.find().populate("use_case");
    res.render("tools", { toolsList });
  } catch (error) {
    next(error);
  }
});

// Render one particular tool
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const tool = await Tool.findById(id).populate("use_case");
    res.render("tool", { tool });
  } catch (error) {
    next(error);
  }
});

// Add one tool to the cart and stock it in req.session.cart
router.get("/:id/addToCart", async (req, res, next) => {
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
