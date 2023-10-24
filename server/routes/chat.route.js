const auth = require('../middlewares/auth');
const { ChatRoomController } = require('../controller');
const express = require('express');
const router = express.Router();

router.get('/',auth(),ChatRoomController.getAllChatRoomsAvailable);
router.get('/chatRoom',auth(),ChatRoomController.getChatRoomData);
router.post('/chatRoom',auth(),ChatRoomController.addMessageToChatRoom);

module.exports = router;