const userController = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);

module.exports = router;
