const express = require('express')
const AuthController = require('../controller/auth');
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/logout", AuthController.logout);

module.exports = router
