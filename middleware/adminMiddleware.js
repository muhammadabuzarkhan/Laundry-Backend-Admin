// middlewares/adminMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { ApiResponse } = require("../Helpers");

const adminMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(ApiResponse({}, "No token provided", false));
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json(ApiResponse({}, "User not found", false));
        }

        if (user.role !== "ADMIN") {
            return res.status(403).json(ApiResponse({}, "Access denied. Admins only.", false));
        }

        // Attach user to request object
        req.user = { id: user._id, email: user.email, role: user.role };
        next();
    } catch (error) {
        return res.status(401).json(ApiResponse({}, "Invalid or expired token", false));
    }
};

module.exports = adminMiddleware;
