import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required."],
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category ID is required."],
        },
        title: {
            type: String,
            required: [true, "Title field is required."],
        },
        content: {
            type: String,
            required: [true, "Content field is required."],
        },
        sticky: {
            type: String,
            required: false,
        },
        isArchived: {
            type: String,
            required: false,
        },
        post_img: {
            path: {
                type: String,
                required: [true, "Image path is required."],
            },
            filename: {
                type: String,
                required: [true, "Image filename is required."],
            },
        },
    },
    {
        timestamps: true,
    }
);

const Post = model("Post", postSchema);
export default Post;
