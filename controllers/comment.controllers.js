import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

const createPostComment = async (req, res) => {
    try {
        const { userId, postId, content } = req.body;
        console.log ('creating comment');
        console.log (req.body);

        const post = await Post.findOne({ _id: postId });
        if (!post) {
            console.log (`postId ${postId}`)
            return res.status(404).send({ message: "Post not found." });
        }
        

        const newComment = new Comment({
            userId,
            postId,
            content,
        });
        await newComment.save();

        res.status(201).send({
            message: "New comment created.",
            data: newComment,
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
}

export { createPostComment }