const Cart = require("../Models/cartmodule");
const Product = require("../Models/ProductModule");

// ADD PRODUCT TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({
        items: [{ product: productId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Added to cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Add to cart failed", error });
  }
};

// GET CART ITEMS
// GET CART ITEMS (Safe)
exports.getCartItems = async (req, res) => {
  try {
    // Fetch cart
    const cart = await Cart.findOne().populate("items.product");

    if (!cart) return res.status(200).json({ items: [] });

    // Remove any items whose product no longer exists
    const validItems = cart.items.filter(item => item.product);

    res.status(200).json({ items: validItems });
  } catch (error) {
    console.error("Cart load error:", error.message);
    res.status(500).json({ message: "Failed to load cart", error: error.message });
  }
};


// UPDATE QUANTITY
exports.updateCartItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart empty" });

    const item = cart.items.id(_id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated", item });

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// DELETE ITEM
exports.deleteCartItem = async (req, res) => {
  try {
    const { _id } = req.params;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart empty" });

    cart.items = cart.items.filter((item) => item._id.toString() !== _id);

    await cart.save();

    res.status(200).json({ message: "Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
