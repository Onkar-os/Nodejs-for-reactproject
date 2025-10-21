const connect = require("../config");
const Cart = require("../Models/cartmodule"); // Make sure you have this model
const Product = require("../Models/ProductModule");

connect();

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product already in cart
    let cartItem = await Cart.findOne({ product: productId });
    if (cartItem) {
      // Update quantity if exists
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem });
    }

    // Else create new cart item
    cartItem = new Cart({
      product: productId,
      quantity: quantity || 1,
    });

    await cartItem.save();
    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// Get all cart items
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("product"); // populate product details
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart items", error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      _id,
      { quantity },
      { new: true }
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart updated", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
};

// Delete cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const cartItem = await Cart.findByIdAndDelete(_id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cart item", error: error.message });
  }
};
