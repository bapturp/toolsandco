const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const exposeUserInfo = require("../middlewares/exposeUserInfo");
const router = express.Router();

const User = require("../models/User.model");
const Reservation = require("../models/Reservation.model");
const Tool = require("./../models/Tool.model");
const Tooltype = require("./../models/Tooltype.model");
const Usecase = require("./../models/Usecase.model");

const uploader = require("../config/cloudinary.config");

// all routes are prefixed with /admin
router.get("/", exposeUserInfo, isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const username = res.locals.currentUser.username;
    return res.render("admin/dashboard", { username });
  } catch (error) {
    return next(error);
  }
});

router.get("/users", exposeUserInfo, isLoggedIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find().populate();
    return res.render("admin/users", { users });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get(
  "/reservations",
  exposeUserInfo,
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    try {
      const reservations = await Reservation.find()
        .populate({
          path: "tool",
          populate: {
            path: "tool_type",
            model: "Tooltype",
          },
        })
        .populate("user");
      console.log(reservations);
      return res.render("admin/reservations", { reservations });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
);

// ***************** Tools management
// Get tools
router.get("/tools", exposeUserInfo, isLoggedIn, isAdmin, async (req, res) => {
  try {
    const tooltypes = await Tooltype.find();
    const usecases = await Usecase.find();
    const tools = await Tool.find().populate("use_case tool_type");
    return res.render("admin/tools/tools", { tools, tooltypes, usecases });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Create tool
router.post("/tools/create", exposeUserInfo, uploader.single('picture_url'), async (req, res, next) => {
  try {
    const { brand, model, description, price_per_day, tool_type, ...rest } = req.body
    const use_case = Object.keys(rest)
    await Tool.create({ brand, model, picture_url: req.file.path, description, price_per_day, tool_type, use_case })
    res.redirect("/admin/tools")
  } catch (err) {
    return next(err)
  }
);

// Get edit tool page
router.get("/tools/:id/edit", exposeUserInfo, isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('use_case tool_type')
    const tooltypes = await Tooltype.find()

    const selectedUsecases = tool.use_case.map((usecase) => usecase.name)
    console.log(selectedUsecases)
    const usecases = await Usecase.find({ name: { $nin: selectedUsecases } })
    return res.render('admin/tools/edit-tool', { tool, tooltypes, usecases })
  } catch (error) {
    return next(error)
  }
);

// Save edits
router.post("/tools/:id/edit", exposeUserInfo, isLoggedIn, isAdmin, uploader.single('picture_url'), async (req, res, next) => {
  try {
    const { brand, model, description, price_per_day, tool_type, ...rest } = req.body
    const use_case = Object.keys(rest)
    await Tool.findByIdAndUpdate(req.params.id, { brand, model, picture_url: req.file?.path, description, price_per_day, tool_type, use_case }, { new: true })
    res.redirect("/admin/tools")
  } catch (error) {
    return next(error)
  }
);

// Get tool types & use cases
router.get(
  "/tools/tool-tags",
  exposeUserInfo,
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    try {
      const tooltypes = await Tooltype.find();
      const usecases = await Usecase.find();
      return res.render("admin/tools/tool-tags", { tooltypes, usecases });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
);

// Delete tool from base
router.post("/tools/:id/delete", async (req, res) => {
  try {
    await Tool.findByIdAndRemove(req.params.id);
    res.redirect("/admin/tools");
  } catch (error) {
    next(err);
  }
});

// Add tool type
router.post("/tools/tooltypes/create", async (req, res, next) => {
  try {
    const { name } = req.body;
    await Tooltype.create({ name });
    res.redirect("/admin/tools/tool-tags");
  } catch (err) {
    return next(err);
  }
});

// Add use case
router.post("/tools/usecases/create", async (req, res, next) => {
  try {
    const { name } = req.body;
    await Usecase.create({ name });
    res.redirect("/admin/tools/tool-tags");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
