const auth = require('../middlewares/auth');
const { User } = require('../models');
const { UserController } = require('../controller');
const express = require('express');
const router = express.Router();

router.get('/',auth(),UserController.getUser);

module.exports = router;
