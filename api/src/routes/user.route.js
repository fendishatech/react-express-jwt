const { verifyToken } = require("../helpers/auth_tokens");
const userController = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/users", verifyToken, userController.getUsers);
router.get("/users/:id", verifyToken, userController.getUser);

module.exports = router;
