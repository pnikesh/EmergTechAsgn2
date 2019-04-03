let express = require('express');
let router = express.Router();

let messageController = require('../controllers/message');

// Get messages list - READ
router.get('/', messageController.displayMessages);

// Adding a messge to the db
router.post('/add', messageController.processMessage);

//delete a message from db
router.get('/delete/:id', messageController.deleteMessage);

module.exports = router;