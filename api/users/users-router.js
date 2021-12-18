// Routers goes here
const router = require("express").Router();
const User = require("./users-model.js");

// [GET] all users // returns all users in the database
router.get("/", (req, res, next) => {
  User.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});
// [GET] by id // returns a user by calling it by its id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.getById(id).then((user) => {
    res.json(user);
  });
});

module.exports = router;
