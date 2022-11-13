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
  console.log(tool);
  res.render("tool", { tool });
});

module.exports = router;
