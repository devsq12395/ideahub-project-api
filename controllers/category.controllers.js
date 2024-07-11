import Category from "../models/category.model.js";
import Post from "../models/post.model.js";

const getCategories = async (req, res) => {
    try {
        const posts = await Category.find().sort({ title: 1 });
        
        res.status(200).send({
            message: "List of categories.",
            data: posts
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const getCategory = async (req, res) => {
    try {
        const { categoryTitle } = req.params;
        const category = await Category.findOne({ title: categoryTitle });
        if (!category) {
            return res.status(404).send({ message: "Category not found." });
        }

        res.status(200).send({
            message: "Category found.",
            data: category
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const getAllPostsFromCategory = async (req, res) => {
    try {
        const { categoryTitle } = req.params;
        const category = await Category.findOne({ title: categoryTitle });
        if (!category) {
            return res.status(404).send({ message: "Category not found." });
        }

        const posts = await Post.find({ categoryId: category._id, isArchived: "false" })
            .sort({ createdAt: -1 })
            .populate({
                path: 'userId', 
                select: 'username avatar.url'
            });
        
        res.status(200).send({
            message: "List of posts.",
            data: posts
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const addCategory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const categoryExists = await Category.findOne({ title });

        if (categoryExists) {
            return res.status(400).send({ message: "Category already exists." });
        }

        const newCategory = new Category({
            title,
            description,
            images: {
                icon: {
                    url: null,
                    public_id: null
                }
            }
        });
        await newCategory.save();

        res.status(201).send({
            message: "Category has been created.",
            data: newCategory,
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

export { getCategories, getCategory, getAllPostsFromCategory, addCategory }