const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");

// Render all the tools stocked inside the cart
router.get("/", async (req, res, next) => {
  try {
    // Check if the cart is not empty
    if (req.session.cart.length !== 0) {
      const startDate = new Date(req.session.date.start);
      const endDate = new Date(req.session.date.end);
      // Get the length of the reservation
      const daysReserved =
        (endDate.getTime() - startDate.getTime()) / 86400000 + 1;
      const toolsList = req.session.cart;
      const reservedTools = await Tool.find({
        _id: {
          $in: toolsList,
        },
      }).populate("use_case");
      //Get all the prices/day of the different tools in the cart
      const prices = reservedTools.map((tool) => {
        return tool.price_per_day;
      });
      // Sum the prices and multiply by the length of the reservation to get total price
      const totalPrice =
        prices.reduce((acc, price) => {
          return acc + price;
        }) * daysReserved;
      req.session.totalPrice = totalPrice;
      res.render("cart", { reservedTools, totalPrice });
    } else {
      res.render("cart");
    }
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
