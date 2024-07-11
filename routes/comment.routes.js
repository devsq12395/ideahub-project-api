import { Router } from "express";
import { 
    createPostComment
} from "../controllers/comment.controllers.js";

const commentRoutes = Router();

commentRoutes.post("/", createPostComment);

export default commentRoutes;
