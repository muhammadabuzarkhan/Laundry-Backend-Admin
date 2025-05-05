const express = require('express');
const router = express.Router();
const { subscribe,getAllSubscribers } = require('../../Controllers/User/subscribeController');

router.post('/user/subscribe', subscribe);
// GET all subscribers
router.get('/subscribers',getAllSubscribers);


module.exports = router;
