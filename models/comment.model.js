import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required."],
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category ID is required."],
        },
        content: {
            type: String,
            required: [true, "Content field is required."],
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);
export default Comment;
