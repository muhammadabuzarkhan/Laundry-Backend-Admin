const CoupenCode = require("../../Models/couponCode");
const { ApiResponse } = require("../../Helpers");

// Create a coupon
exports.createCoupenCode = async (req, res) => {
  const { title, expireDate, discount, limitCoupenTimes } = req.body;

  try {
    const checkedCoupen = await CoupenCode.find({ title });

    if (new Date() >= new Date(expireDate)) {
      return res.status(400).json(ApiResponse({}, "Coupon date must be in the future", false));
    }

    if (checkedCoupen.length > 0) {
      return res.status(400).json(ApiResponse({}, "Coupon already exists", false));
    }

    const data = {
      title,
      code: "L" + Math.floor(Math.random() * 1000000),
      expireDate,
      discount,
      limitCoupenTimes,
      noOfTimes: 0, // assuming this should start at 0
    };

    const newCoupen = await CoupenCode.create(data);

    res.status(200).json(ApiResponse({ newCoupen }, "Coupon created successfully", true));
  } catch (error) {
    res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Redeem a coupon
exports.userCoupenCode = async (req, res) => {
  const { code } = req.params;

  try {
    const coupenDetails = await CoupenCode.findOne({ code });

    if (!coupenDetails) {
      return res.status(404).json(ApiResponse({}, "Coupon not found", false));
    }

    if (new Date() > new Date(coupenDetails.expireDate)) {
      return res.status(400).json(ApiResponse({}, "Coupon expired", false));
    }

    if (coupenDetails.noOfTimes >= coupenDetails.limitCoupenTimes) {
      return res.status(400).json(ApiResponse({}, "Coupon limit exceeded", false));
    }

    const redeemCoupen = await CoupenCode.findByIdAndUpdate(
      coupenDetails._id,
      { noOfTimes: coupenDetails.noOfTimes + 1 },
      { new: true }
    );

    res.status(200).json(ApiResponse({ redeemCoupen }, "Coupon redeemed successfully", true));
  } catch (error) {
    res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Get all coupons
exports.getAllCoupenCode = async (req, res) => {
  try {
    const allCoupen = await CoupenCode.find({});
    res.status(200).json(ApiResponse({ allCoupen }, "All coupons retrieved", true));
  } catch (error) {
    res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Delete a coupon
exports.deleteCoupenCode = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCoupen = await CoupenCode.findByIdAndDelete(id);

    if (!deleteCoupen) {
      return res.status(404).json(ApiResponse({}, "Coupon not found", false));
    }

    res.status(200).json(ApiResponse({ deleteCoupen }, "Coupon deleted successfully", true));
  } catch (error) {
    res.status(500).json(ApiResponse({}, error.message, false));
  }
};
