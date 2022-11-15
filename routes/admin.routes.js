const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

const User = require("../models/User.model");
const Reservation = require("../models/Reservation.model");

// all routes are prefixed with /admin
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

module.exports = router;
