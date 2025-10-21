const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

// Add product to cart
router.post("/cart/add", cartController.addToCart);

// Get all cart items
router.get("/cart", cartController.getCartItems);

// Update cart item quantity
router.put("/cart/:_id", cartController.updateCartItem);

// Delete cart item
router.delete("/cart/:_id", cartController.deleteCartItem);

module.exports = router;
