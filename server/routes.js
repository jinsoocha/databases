var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/login', controller.users.get);

router.post('/login', controller.users.post);

router.get('/messages', controller.messages.get);

router.post('/messages', controller.messages.post);



module.exports = router;

