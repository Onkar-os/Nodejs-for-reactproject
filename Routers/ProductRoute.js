const express = require('express');
const route = express.Router();
const pc = require('../Controller/ProductContoller');
const verifyAdmin = require("../middleware/verifyAdmin"); // added for admin routes

// Admin protected routes
route.post("/", verifyAdmin, pc.addproduct);
route.put("/:_id", verifyAdmin, pc.updateproduct);
route.delete("/:_id", verifyAdmin, pc.deleteproduct);

// Public routes
route.get("/", pc.getproducts);
route.get("/:_id", pc.getproductById);
route.get("/getcategory/:category", pc.getproductByCategory);

module.exports = route;
