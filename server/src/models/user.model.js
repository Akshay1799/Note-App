// user.model.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
});

userSchema.pre("save", async function () {
  if (!this.isModified('password')) return;

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model("Users", userSchema);
export default User;
