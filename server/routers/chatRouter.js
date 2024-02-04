const Router = require('express');
const router = new Router();
const controller = require('../controllers/chatController');


router.get('/messages', controller.getMessages);

module.exports = router;