const auth = require('../middlewares/auth');
const { UserController } = require('../controller');
const express = require('express');
const router = express.Router();

router.get('/',auth(),UserController.getUser);
router.get('/books',auth(),UserController.getUserBooks);
router.get('/requests',auth(),UserController.getUserRequests);

module.exports = router;
