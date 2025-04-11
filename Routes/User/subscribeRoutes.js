const express = require('express');
const router = express.Router();
const { subscribe } = require('../../Controllers/User/subscribeController');

router.post('/user/subscribe', subscribe);

module.exports = router;
