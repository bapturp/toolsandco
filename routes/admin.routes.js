const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

const User = require("../models/User.model");
const Reservation = require("../models/Reservation.model");
const Tool = require("./../models/Tool.model");
const Tooltype = require("./../models/Tooltype.model")
const Usecase = require("./../models/Usecase.model");

const uploader = require('../config/cloudinary.config');

// all routes are prefixed with /admin
router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    return res.render("admin/dashboard")
  } catch (error) {
    return next(error)
  }

})

router.get("/users", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find().populate();
    return res.render("admin/users", { users });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/reservations", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.find().populate();
    return res.render("admin/reservations", { reservations });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// ***************** Tools management
// Get tools
router.get("/tools", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const tooltypes = await Tooltype.find()
    const usecases = await Usecase.find()
    const tools = await Tool.find().populate('use_case tool_type')
    return res.render("admin/tools/tools", { tools, tooltypes, usecases });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Create tool
router.post("/tools/create", uploader.single('picture_url'), async (req, res, next) => {
  try {
    const { brand, model, description, price_per_day, tool_type, use_case } = req.body
    await Tool.create({ brand, model, picture_url: req.file.path, description, price_per_day, tool_type, use_case })
    res.redirect("/admin/tools")
  } catch (err) {
    return next(err)
  }
})

// Get edit tool page
router.get("/tools/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('use_case tool_type')
    const tooltypes = await Tooltype.find()
    const usecases = await Usecase.find()
    return res.render('admin/tools/edit-tool', { tool, tooltypes, usecases })
  } catch (error) {
    return next(error)
  }
})

// Save edits
router.post("/tools/:id/edit", isLoggedIn, isAdmin, uploader.single('picture_url'), async (req, res, next) => {
  try {
    const { brand, model, description, price_per_day, tool_type, use_case } = req.body
    await Tool.findByIdAndUpdate(req.params.id, { brand, model, picture_url: req.file.path, description, price_per_day, tool_type, use_case }, { new: true })
    res.redirect("/admin/tools")
  } catch (error) {
    return next(error)
  }
})

// Get tool types & use cases
router.get("/tools/tool-tags", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const tooltypes = await Tooltype.find()
    const usecases = await Usecase.find()
    return res.render("admin/tools/tool-tags", { tooltypes, usecases });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Add tool type
router.post("/tools/tooltypes/create", async (req, res, next) => {
  try {
    const { name } = req.body
    await Tooltype.create({ name })
    res.redirect("/admin/tools/tool-tags")
  } catch (err) {
    return next(err)
  }
})

// Add use case
router.post("/tools/usecases/create", async (req, res, next) => {
  try {
    const { name } = req.body
    await Usecase.create({ name })
    res.redirect("/admin/tools/tool-tags")
  } catch (err) {
    return next(err)
  }
})

module.exports = router;
