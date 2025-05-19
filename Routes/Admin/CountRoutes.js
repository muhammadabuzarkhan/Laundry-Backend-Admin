const express = require("express");
const router = express.Router();
const countsController = require("../../Controllers/countData");
// const getOrderStatusCounts  = require('../../Controllers/Admin/adminOrderController')
const {getOrderStatusCounts} = require("../../Controllers/Admin/adminOrderController")


const {verifyToken ,validateToken} = require('../../Helpers/index')

// Define the route for fetching counts
router.get("/admin/counts", validateToken, verifyToken, countsController.getCounts);
// router.get("/order/getstatus",validateToken,verifyToken, getOrderStatusCounts)



module.exports = router;
