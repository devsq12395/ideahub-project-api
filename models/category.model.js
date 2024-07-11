import { Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title field is required."],
        },
        description: {
            type: String,
            required: [true, "Description field is required."],
        },
        images: {
            icon: {
                path: {
                    type: String,
                    required: false
                },
                filename: {
                    type: String,
                    required: false
                },
            }
        },
    },
    {
        timestamps: true,
    }
);

const Category = model("Category", categorySchema);
export default Category;
