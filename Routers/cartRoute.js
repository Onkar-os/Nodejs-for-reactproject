const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

// Add to cart
router.post("/cart/add", cartController.addToCart);

// Get all cart items
router.get("/cart", cartController.getCartItems);

// Update quantity
router.put("/cart/update/:_id", cartController.updateCartItem);

// Delete item
router.delete("/cart/delete/:_id", cartController.deleteCartItem);

module.exports = router;
