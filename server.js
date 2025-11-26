// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const productRoutes = require("./Routers/ProductRoute");
const loginRoutes = require("./Routers/LoginRoute");
const cartRoutes = require("./Routers/cartRoute");
const adminRoutes = require("./Routers/adminRoute");
const verifyAdmin = require("./Middleware/verifyAdmin");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Public routes
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/api/Login", loginRoutes);
app.use("/api/admin", adminRoutes);

// Protected admin routes example
app.use("/api/products", verifyAdmin, productRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
