const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["student", "instructor"], required: true },
    passwordHash: { type: String, required: true },
    refresh: { type: String }, // Refresh token
    //   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Optional
});

module.exports = mongoose.model("User", userSchema);
