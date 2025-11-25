const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const productRoutes = require("./Routers/ProductRoute");
const loginRoutes = require("./Routers/LoginRoute");
const cartRoutes = require("./Routers/cartRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB only ONCE
connectDB();

// Routes
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/api/Login", loginRoutes);

// Server
app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000...");
});
