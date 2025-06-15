const express = require('express');
const router = express.Router();
const CallOrderController = require('../../Controllers/Admin/callOrderController');




router.get('/callorder/status-counts', CallOrderController.getCallOrderStatusCounts);

// Existing routes
router.post('/callorder/create', CallOrderController.createOrder);
router.post('/callorder/create-multiple', CallOrderController.createMultipleOrders);

router.get('/callorder/getall', CallOrderController.getAllOrders);
router.get('/callorder/:id', CallOrderController.getOrderById);
router.put('/callorder/:id', CallOrderController.updateOrder);
router.delete('/callorder/:id', CallOrderController.deleteOrder);

// ✅ New route to update order status
router.put('/callorder/:id/status', CallOrderController.updateOrderStatus);

// ✅ New route to get count of pending and completed orders
router.get('/callorder/status-counts', CallOrderController.getOrderCountsByStatus);

// ✅ Get all orders for a specific customer (by customer ID)
router.get('/callorder/customer/:customerId', CallOrderController.getOrdersByCustomerId);
// In your routes file
router.patch('/callorder/:id/status', CallOrderController.updateOrderStatus);

router.get('/callorder/status-counts', CallOrderController.getCallOrderStatusCounts);



module.exports = router;
