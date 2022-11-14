const express = require("express");
const router = express.Router();
const Tool = require("./../models/Tool.model");
// const cartArray = [];

router.get("/", async (req, res, next) => {
  const toolsList = await Tool.find();
  res.render("tools", { toolsList });
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const tool = await Tool.findById(id);
  console.log(tool);
  res.render("tool", { tool });
});

router.get("/:id/addToCart", async (req, res, next) => {
  const foundTool = await Tool.findById(req.params.id);
  console.log("========");
  const id = req.params.id;
  req.session.cart.push(id);
  console.log(req.session.cart);
  console.log(foundTool);
  res.status(200).json(req.session.cart);
  //return foundTool;
});

function addToCart(id) {
  cartArray.push(id);
}

module.exports = router;
