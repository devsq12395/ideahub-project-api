import { Router } from "express";
import { 
    getCategories,
    getCategory,
    getAllPostsFromCategory,
    addCategory
} from "../controllers/category.controllers.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:categoryTitle", getCategory);
categoryRoutes.get("/:categoryTitle/posts", getAllPostsFromCategory);
categoryRoutes.post("/", addCategory);

export default categoryRoutes;
