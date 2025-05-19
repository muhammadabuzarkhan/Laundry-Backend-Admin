const express = require('express');
const router = express.Router();
const CallOrderController = require('../../Controllers/Admin/callOrderController');

router.post('/callorder/create', CallOrderController.createOrder);
router.get('/callorder/getall', CallOrderController.getAllOrders);
router.get('/callorder/:id', CallOrderController.getOrderById);
router.put('/callorder/:id', CallOrderController.updateOrder);
router.delete('/callorder/:id', CallOrderController.deleteOrder);

module.exports = router;
