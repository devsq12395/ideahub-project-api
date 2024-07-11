import { Router } from "express";
import { signup, signin, uploadAvatar } from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.post("/register", signup);
userRoutes.post("/login", signin);
userRoutes.post("/upload-avatar", uploadAvatar);

export default userRoutes;
