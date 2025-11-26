const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/adminModule");

mongoose.connect("mongodb://localhost:27017/test")
  .then(async () => {
    const hashed = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      email: "admin@gmail.com",
      password: hashed
    });

    console.log("Admin created successfully!");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
