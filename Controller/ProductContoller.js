const Product = require("../Models/ProductModule");

// CREATE
exports.addproduct = async (req, res) => {
  try {
    const obj = new Product(req.body);
    await obj.save();
    res.status(201).json({ message: "Product Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Not created", error: error.message });
  }
};

// READ ALL
exports.getproducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts); // <-- just return array directly
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// READ ONE BY ID
exports.getproductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product); // return product directly
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateproduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteproduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY CATEGORY
exports.getproductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
