const Category = require("../Models/Category");  
const SubCategory = require("../Models/subCategory");
const User = require("../Models/User");
const Product = require("../Models/Product");
const Order = require("../Models/Order");
const Coupon = require("../Models/couponCode");
const Query = require("../Models/Query");
const Subscriber = require("../Models/Subscribe");

exports.getCounts = async (req, res) => {
  try {
    // Get count for each model
    const categoryCount = await Category.countDocuments({});
    const subCategoryCount = await SubCategory.countDocuments({});
    const userCount = await User.countDocuments({});
    const productCount = await Product.countDocuments({});
    const orderCount = await Order.countDocuments({});
    const couponCount = await Coupon.countDocuments({});
    const queryCount = await Query.countDocuments({});
    const subscriberCount = await Subscriber.countDocuments({});

    // Return all counts in the response
    return res.json({
      categoryCount,
      subCategoryCount,
      userCount,
      productCount,
      orderCount,
      couponCount,
      queryCount,
      subscriberCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
