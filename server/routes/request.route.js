const express = require('express');
const { auth } = require('../middlewares');
const router = express.Router();
const {RequestController} = require('../controller');

router.post('/book',auth(),RequestController.addRequest);

router.get('/bookId',auth(),RequestController.requestForBookId);

module.exports = router;