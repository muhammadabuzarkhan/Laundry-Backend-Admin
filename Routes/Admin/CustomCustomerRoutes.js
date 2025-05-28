const express = require('express');
const router = express.Router();
const customerController = require('../../Controllers/Admin/CustomCustomerController');
const adminMiddleware = require('../../middleware/adminMiddleware');

// Create a customer
router.post('/custom-customer/add', customerController.createCustomer);

// Get all customers
router.get('/custom-customer/get', customerController.getAllCustomers);

// Get a single customer by ID
router.get('/custom-customer/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/custom-customer/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/custom-customer/:id', customerController.deleteCustomer);  // <-- Added this line

module.exports = router;
