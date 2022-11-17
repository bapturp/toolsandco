const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
const Reservation = require("./../models/Reservation.model");

// Render all the tools
// router.get("/", async (req, res, next) => {
//   try {
//     const toolsList = await Tool.find().populate("use_case");
//     res.render("tools", { toolsList });
//   } catch (error) {
//     next(error);
//   }
// });

// Render one particular tool
router.get("/:id", async (req, res, next) => {
  try {
    res.locals.date = req.session.date;
    res.locals.previousUrl = req.session.previousUrl;
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

  if (!req.session.date.start) {
    req.session.date.start = req.body["start-date"];
    req.session.date.end = req.body["end-date"];
  }
  if (req.session.cart.includes(id)) {
    res.locals.cart = req.session.cart.length;
    return res.status(200).json(req.session.cart);
  }

  req.session.cart.push(id);
  res.locals.cart = req.session.cart.length;
  res.status(200).json(req.session.cart);
});
router.post("/:id/addToCart", async (req, res, next) => {
  const id = req.params.id;

  if (!req.session.date.start) {
    req.session.date.start = req.body["start-date"];
    req.session.date.end = req.body["end-date"];
  }
  if (req.session.cart.includes(id)) {
    res.locals.cart = req.session.cart.length;
    return;
  }
  const itemToCart = await Reservation.find({
    $and: [
      { tool: id },
      { start_date: req.session.date.start },
      { end_date: req.session.date.end },
    ],
  });
  console.log(itemToCart);
  if (itemToCart.length !== 0) {
    req.session.cart.push(id);
    res.locals.cart = req.session.cart.length;
    return res.redirect("/cart");
  } else {
    const tool = await Tool.findById(id).populate("use_case");
    return res.render("tool", { tool, errorMessage: "Tool unavailable..." });
  }
});

module.exports = router;
