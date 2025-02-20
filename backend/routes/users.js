const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/authenticate', userController.authenticateUser);
router.get('/', userController.getUsers);

module.exports = router;