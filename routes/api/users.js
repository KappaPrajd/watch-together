const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//validatiion
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//User model
const User = require("../../models/User");

//@route POST api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  //validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //check if user exists
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });

      //hash password before saving
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route POST api/users/login
//@desc Login user and return JWT token
//@access Public
router.post("/login", (req, res) => {
  //validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //check if user exists
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }

    //compare hashed passwords
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
