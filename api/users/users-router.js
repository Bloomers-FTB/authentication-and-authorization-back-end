// Routers goes here
const router = require("express").Router();

const User = require("./users-model.js");

// [GET] // returns all users
router.get("/", (req, res, next) => {
  User.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

// [GET] by ID // returns a user
router.get("/:id", (req, res, next) => {
  User.getById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
