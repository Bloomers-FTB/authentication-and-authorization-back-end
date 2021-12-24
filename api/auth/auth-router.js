const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../users/users-model.js");
const { BCRYPT_ROUNDS } = require("../../config/index.js");
const { tokenBuilder } = require("./auth-helpers.js");
const {
  validateBody,
  validateUsername,
  checkUsernameFree,
  validateEmail,
  checkEmailFree,
  validateRole,
} = require("./auth-middleware.js");

// [POST] /api/auth/register -- creates a new user into the database
router.post(
  "/register",
  validateBody,
  validateEmail,
  validateRole,
  checkUsernameFree,
  checkEmailFree,
  async (req, res, next) => {
    const { username, email, password, role_id } = req.body;
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
    const newUser = {
      username: username,
      email: email,
      password: hash,
      role_id: role_id,
    };
    try {
      const user = await User.create(newUser);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

// [POST] login // logs in the user into the database
router.post(
  "/login",
  validateBody,
  validateUsername,
  async (req, res, next) => {
    const { password } = req.body;
    if (bcrypt.compareSync(password, req.user.password)) {
      const token = tokenBuilder(req.user);
      res.json({
        message: `Welcome, ${req.user.username}!`,
        user_id: req.user.user_id,
        token: token,
      });
    } else {
      next({
        status: 401,
        message: "Invalid Credentials",
      });
    }
  }
);

module.exports = router;
