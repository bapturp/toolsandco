const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Reservation = require("./../models/Reservation.model");
const User = require("./../models/User.model");

router.get("/", async (req, res, next) => {
  try {
    const userId = res.locals.currentUser._id;
    const currentDate = new Date();
    const reservations = await Reservation.find({ user: userId })
      .populate("tool")
      .populate({
        path: "tool",
        populate: {
          path: "tool_type",
          model: "Tooltype",
        },
      });
    // Stocking current and passed reservations in differents arrays
    const passedReservations = [];
    const currentReservations = [];

    reservations.forEach((reservation) => {
      const reservationEndDate = reservation.end_date;

      if (currentDate <= reservationEndDate) {
        currentReservations.push(reservation);
      } else {
        passedReservations.push(reservation);
      }
    });

    res.render("profile", {
      passedReservations,
      currentReservations,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/change", async (req, res, next) => {
  res.locals.previousUrl = req.session.previousUrl;
  res.render("change-credentials");
});

router.post("/change", async (req, res, next) => {
  try {
    res.locals.error = false;
    const userId = res.locals.currentUser._id;
    const user = await User.findById(userId);
    const actualPassword = user.password;
    let {
      username,
      email,
      "old-password": oldPassword,
      "new-password": newPassword,
    } = req.body;

    if (!username) {
      username = res.locals.currentUser.username;
    } else {
      username = req.body.username;
    }
    if (!email) {
      email = res.locals.currentUser.email;
    } else {
      email = req.body.email;
    }

    if (!newPassword) {
      newPassword = actualPassword;
      oldPassword = actualPassword;
      res.locals.currentUser.username = username;
      res.locals.currentUser.email = email;

      const modifiedUser = await User.findByIdAndUpdate(userId, {
        username,
        email,
        newPassword,
      });
      return res.redirect("/profile");
    }

    if (newPassword) {
      res.locals.currentUser.username = username;
      res.locals.currentUser.email = email;
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      if (newPassword.length < 6) {
        return res.status(400).render("change-credentials", {
          shortPasswordError:
            "Your password needs to be at least 6 characters long.",
        });
      }
      if (!(await bcrypt.compare(oldPassword, actualPassword))) {
        res.locals.badPassword = true;
        return res.status(400).render("change-credentials", {
          errorMessage: "Wrong password.",
        });
      } else {
        res.locals.badPassword = false;
        const modifiedUser = await User.findByIdAndUpdate(userId, {
          username,
          email,
          password: hashedNewPassword,
        });
        return res.redirect("/profile");
      }
    } else {
      const modifiedUser = await User.findByIdAndUpdate(userId, {});
      return res.status(400).render("change-credentials", {
        noChanges: "Error.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
