// Middleware/verifyAdmin.js
const jwt = require("jsonwebtoken");

module.exports = function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1]; // Extract token
  if (!token)
    return res.status(401).json({ message: "No token found." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden. Admin only." });

    req.admin = decoded;
    next();
  } catch (err) {
    console.log("Invalid Token Error:", err.message);
    return res.status(400).json({ message: "Invalid token." });
  }
};
