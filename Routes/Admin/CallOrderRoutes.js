const express = require('express');
const router = express.Router();
const CallOrderController = require('../../Controllers/Admin/callOrderController');

// Existing routes
router.post('/callorder/create', CallOrderController.createOrder);
router.get('/callorder/getall', CallOrderController.getAllOrders);
router.get('/callorder/:id', CallOrderController.getOrderById);
router.put('/callorder/:id', CallOrderController.updateOrder);
router.delete('/callorder/:id', CallOrderController.deleteOrder);

// ✅ New route to update order status
router.put('/callorder/:id/status', CallOrderController.updateOrderStatus);

// ✅ New route to get count of pending and completed orders
router.get('/callorder/status-counts', CallOrderController.getOrderCountsByStatus);

module.exports = router;
