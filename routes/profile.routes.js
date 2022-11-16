const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Reservation = require("./../models/Reservation.model");
const User = require("./../models/User.model");

router.get("/", async (req, res, next) => {
  try {
    const userId = res.locals.currentUser._id;
    const currentDate = new Date();
    const reservations = await Reservation.find({ user: userId }).populate(
      "tool"
    );
    // Stocking current and passed reservations in differents arrays
    const passedReservations = [];
    const currentReservations = [];
    reservations.forEach((reservation) => {
      console.log(currentDate <= reservation.end_date);
      if (currentDate <= reservation.end_date) {
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
  res.render("changeCredentials");
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
    }
    if (!email) {
      email = res.locals.currentUser.email;
    }
    if (!newPassword) {
      newPassword = res.locals.currentUser["new-password"];
      oldPassword = res.locals.currentUser["new-password"];
    }

    if (newPassword) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      if (newPassword.length < 6) {
        return res.status(400).render("changeCredentials", {
          shortPasswordError:
            "Your password needs to be at least 6 characters long.",
        });
      }
      if (!(await bcrypt.compare(oldPassword, actualPassword))) {
        res.locals.badPassword = true;
        return res.status(400).render("changeCredentials", {
          errorMessage: "Wrong password.",
        });
      } else {
        res.locals.badPassword = false;
        const modifiedUser = await User.findByIdAndUpdate(userId, {
          username,
          email,
          password: hashedNewPassword,
        });
        res.render("profile", {
          savedChanges: "Saved Changes !",
        });
      }
    } else {
      const modifiedUser = await User.findByIdAndUpdate(userId, {});
      res.status(400).render("changeCredentials", {
        noChanges: "Error.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
