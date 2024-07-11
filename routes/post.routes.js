import { Router } from "express";
import multer from "multer";
import { storage } from "../config/storage.js";
import { 
    getPostComments,
    getPost, 
    createPost,
    editPost,
    archivePost
} from "../controllers/post.controllers.js";

const postRoutes = Router();
const postImage = multer({ storage });

postRoutes.get("/comments/:postId", getPostComments);
postRoutes.get("/:id", getPost);
postRoutes.put("/edit/:id", editPost);
postRoutes.put("/archive/:id", archivePost);
postRoutes.post(
    "/", 
    postImage.single("postImage"),
    createPost
);

export default postRoutes;
