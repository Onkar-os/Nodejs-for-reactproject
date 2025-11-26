// Middleware/verifyAdmin.js
const jwt = require("jsonwebtoken");

module.exports = function verifyAdmin(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "SECRET_KEY_123");
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden. Admin only." });

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
