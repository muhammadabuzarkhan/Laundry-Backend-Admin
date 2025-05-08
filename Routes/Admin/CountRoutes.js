const express = require("express");
const router = express.Router();
const countsController = require("../../Controllers/countData");

const {verifyToken ,validateToken} = require('../../Helpers/index')

// Define the route for fetching counts
router.get("/admin/counts", validateToken, verifyToken, countsController.getCounts);


module.exports = router;
