import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPosts,
  showPost,
  updatePost,
} from "../controllers/postController.js";
import AuthController from "../controllers/AuthController.js";
import { adminValidatorMiddleware } from "../middlewares/AdminValidatorMiddleware.js";
import { createPostValidatorMiddleware } from "../middlewares/CreatePostValidatorMiddleware.js";
import { deleteComment } from "../controllers/commentController.js";

const router = Router();

router.post("/login",AuthController.login);
router.get("/posts",adminValidatorMiddleware, fetchPosts);
router.post("/create",adminValidatorMiddleware,createPostValidatorMiddleware , createPost);
router.put("/posts/:id",adminValidatorMiddleware, updatePost);
router.delete("/posts/:id",adminValidatorMiddleware, deletePost);
router.delete("/comment/:id",adminValidatorMiddleware, deleteComment);
router.get("/singlepost/:id",adminValidatorMiddleware, showPost);


export default router;
