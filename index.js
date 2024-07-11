import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import categoryRoutes from "./routes/category.routes.js";

dotenv.config();

const app = express();
const baseURL = "/api/v1";

db();
app.use(cors());
app.use(express.json());

app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/posts`, postRoutes);
app.use(`${baseURL}/posts/:id/comments`, commentRoutes);
app.use(`${baseURL}/categories`, categoryRoutes);
app.use("/", (req, res) => res.send({ app: "forum_proj" }));

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
