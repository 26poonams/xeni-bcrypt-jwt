const express = require('express')
const UserController = require('../controller/user')
const router = express.Router();
const {isLoggedIn} =require("../middleware/middlewares");

router.use(isLoggedIn);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router