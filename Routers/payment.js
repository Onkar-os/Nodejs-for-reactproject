const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // store in .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order API
router.post("/checkout", async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
});

module.exports = router;
