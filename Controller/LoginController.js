const Login = require('../Models/LoginModule'); // import your model
const bcrypt = require('bcryptjs'); // For hashing passwords

// --- Register User ---
exports.registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await Login.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create new user
    const newUser = new Login({
      name,
      password: hashedPassword,
    });

    // 5️⃣ Save user to database
    await newUser.save();

    // 6️⃣ Return success response
    res.status(201).json({
      message: "User registered successfully!",
      user: { id: newUser._id, name: newUser.name },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};


// --- Login User ---
exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check for missing fields
    if (!name || !password) {
        return res.status(400).json({ message: "Please enter all fields." });
    }

    // Check if user exists
    const user = await Login.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" }); // Use a generic message for security
    }

    // --- SECURITY: Compare submitted password with the hashed password in the DB ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Generic message
    }

    // On successful login, you should ideally create and send a JSON Web Token (JWT)
    // For now, we'll send a success message.
    res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name } });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
