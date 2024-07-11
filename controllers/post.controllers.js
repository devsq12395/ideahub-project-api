import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findOne({ postId }).populate({
            path: 'userId', 
            select: 'username avatar.url'
        });
        if (!post) {
            return res.status(404).send({ message: "Post not found." });
        }

        res.status(200).send({
            message: "Post found.",
            data: post
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        const { userId, categoryId, title, content } = req.body;
        const { path, filename } = req.file;

        const newPost = new Post({
            userId,
            categoryId,
            title,
            content,
            sticky: "false",
            isArchived: "false",
            post_img: { path, filename }
        });
        await newPost.save();

        res.status(201).send({
            message: "New post created.",
            data: newPost,
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updateData = { title, content };

        if (req.file) {
            const { path, filename } = req.file;
            updateData.post_img = { path, filename };
        }

        const post = await Post.findByIdAndUpdate({_id: id}, updateData, { new: true });

        if (!post) {
            return res.status(404).send({ message: "Post not found." });
        }

        res.status(200).send({
            message: "Post updated.",
            data: post
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const archivePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndUpdate(id, { isArchived: true }, { new: true });

        if (!post) {
            return res.status(404).send({ message: "Post not found." });
        }

        res.status(200).send({
            message: "Post archived.",
            data: post
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;console.log (postId);
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(404).send({ message: "Post not found." });
        }

        const comments = await Comment.find({ postId }).sort({ createdAt: 1 })
            .populate({
                path: "userId",
                select: "username avatar.url",
            });

        res.status(200).send({
            message: "List of comments.",
            data: comments,
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

export { 
    getPost, 
    createPost,
    getPostComments,
    editPost,
    archivePost
}