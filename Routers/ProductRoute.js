const express = require('express');
const route = express.Router();
const pc = require('../Controller/ProductContoller');
const verifyAdmin = require("../Middleware/verifyAdmin");

// CREATE (admin)
route.post("/", verifyAdmin, pc.addproduct);

// READ ALL
route.get("/", pc.getproducts);

// CATEGORY
route.get("/category/:category", pc.getproductByCategory);

// READ ONE BY ID
route.get("/:id", pc.getproductById);

// UPDATE (admin)
route.put("/:id", verifyAdmin, pc.updateproduct);

// DELETE (admin)
route.delete("/:id", verifyAdmin, pc.deleteproduct);

module.exports = route;
