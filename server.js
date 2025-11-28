require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");

const productRoutes = require("./Routers/ProductRoute");
const loginRoutes = require("./Routers/LoginRoute");
const cartRoutes = require("./Routers/cartRoute");
const adminRoutes = require("./Routers/adminRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// PUBLIC PRODUCT ROUTES
app.use("/api/products", productRoutes);

// USER ROUTES
app.use("/api/login", loginRoutes);
app.use("/api/cart", cartRoutes);

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
