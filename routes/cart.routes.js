const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");

// Render all the tools stocked inside the cart
router.get("/", async (req, res, next) => {
  try {
    const toolsList = req.session.cart;
    const reservedTools = await Tool.find({
      _id: {
        $in: toolsList,
      },
    });
    res.render("cart", { reservedTools });
  } catch (error) {
    next(error);
  }
});

// Clear all the cart
router.get("/clear", (req, res, next) => {
  req.session.cart = [];
  res.redirect("/cart");
});

// Clear one particular tool in the cart
router.get("/clear-item/:id", (req, res, next) => {
  const id = req.params.id;
  req.session.cart.splice(req.session.cart.indexOf(id), 1);
  res.redirect("/cart");
});

module.exports = router;
