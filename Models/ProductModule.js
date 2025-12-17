const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pname: { type: String, required: true },

  price: { type: Number, required: true },

  category: { type: String, required: true },

  stock: { type: Boolean, required: true },

  images: {
    type: [String],
    default: [],
  },

  description: { type: String, required: true },
});

module.exports = mongoose.model("products815", productSchema);
