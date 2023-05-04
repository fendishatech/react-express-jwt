const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.get("/auth/refresh", authController.refreshAccessToken);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/register", authController.register);

module.exports = router;
