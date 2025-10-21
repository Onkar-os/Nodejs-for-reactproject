const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const productRoutes = require("./Routers/ProductRoute");
const loginRoutes = require("./Routers/LoginRoute");
const cartRoutes = require("./Routers/cartRoute");

app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/api/Login", loginRoutes);

// Start Server
app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000...");
});
