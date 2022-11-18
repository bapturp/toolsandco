const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middlewares/isLoggedOut");
const isLoggedIn = require("../middlewares/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/signup", isLoggedOut, async (req, res) => {
  const { username, email, password } = req.body;

  // Check that username, email, and password are provided
  if (username === "" || email === "" || password === "") {
    return res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
  }

  if (password.length < 6) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  //   ! This regular expression checks password for special characters and minimum length
  /*
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res
        .status(400)
        .render('auth/signup', {
          errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
      });
      return;
    }
    */

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // salt with 10 rounds

    await User.create({ username, email, password: hashedPassword });

    return res.redirect("/auth/login");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(500)
        .render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      // return res.send('duplicate key error')
      return res.status(500).render("auth/signup", {
        errorMessage:
          "Username and email need to be unique. Provide a valid username or email.",
      });
    } else {
      return next(error);
    }
  }
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login", { prevurl: req.query.prevurl });
});

// POST /auth/login
router.post("/login", isLoggedOut, async (req, res, next) => {
  const { email, password } = req.body;

  // Check that username, email, and password are provided
  if (email === "" || password === "") {
    return res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide username, email and password.",
    });
  }

  // If user is found based on the username, check if the in putted password matches the one saved in the database
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .render("auth/login", { errorMessage: "Wrong credentials." });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .render("auth/login", { errorMessage: "Wrong credentials." });
    }
    req.session.currentUser = user.toObject();
    delete req.session.currentUser.password;

    if (req.query.prevurl) {
      res.redirect(decodeURIComponent(req.query.prevurl));
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    // console.error(error);
    next(error);
  }
});

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    return res.redirect("/");
  });
});

module.exports = router;
