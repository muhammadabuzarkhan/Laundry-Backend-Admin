const express = require('express');
const router = express.Router();
const { subscribe,getAllSubscribers,updateSubscriberStatus } = require('../../Controllers/User/subscribeController');

router.post('/user/subscribe', subscribe);
// GET all subscribers
router.get('/subscribers',getAllSubscribers);
router.patch('/subscriber/status',updateSubscriberStatus);



module.exports = router;