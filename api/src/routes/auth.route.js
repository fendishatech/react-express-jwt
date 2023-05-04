const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.get("/auth/refresh", authController.refresh);
router.get("/auth/login", authController.login);
router.get("/auth/logout", authController.logout);
router.get("/auth/register", authController.register);

module.exports = router;
