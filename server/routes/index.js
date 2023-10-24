const express = require("express");
const authRoutes = require("./auth.route");
const bookRoutes = require("./book.route");
const userRoutes = require('./user.route');
const requestRoutes = require('./request.route');
const chatRoutes = require('./chat.route');

const router = express.Router();
router.use("/auth",authRoutes);
router.use("/book",bookRoutes);
router.use('/user',userRoutes);
router.use('/request',requestRoutes);
router.use('/chat',chatRoutes);

module.exports = router;