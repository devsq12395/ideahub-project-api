import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: [true, "Username field is required."],
    },
    email: {
        type: String,
        required: [true, "Email field is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password field is required."],
    },
    reputation: {
        type: String,
        required: false,
    },
    global_role: {
        type: String,
        required: [true, "Global Role field is required."],
    },
    avatar: {
        url: {
            type: String,
            required: false,
        },
        public_id: {
            type: String,
            required: false,
        },
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
