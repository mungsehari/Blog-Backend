import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  userBlogControlller,
} from "../controllers/blogController.js";
import authenticateJWT from "../middelwares/authMiddleware.js";

const blogRouter = express.Router();
blogRouter.get("/all-blog", getAllBlogsController);
blogRouter.post("/create-blog", authenticateJWT, createBlogController);
blogRouter.put("/update-blog/:id", updateBlogController);
blogRouter.delete("/delete-blog/:id", deleteBlogController);
blogRouter.get("/blog/:id", getBlogByIdController);
blogRouter.get("/user-blog/:id", userBlogControlller);

export default blogRouter;
