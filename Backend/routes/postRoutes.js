import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPosts,
  searchPost,
  showPost,
  updatePost,
} from "../controllers/postController.js";

const router = Router();

router.get("/posts", fetchPosts);
router.get("/posts/search", searchPost);
router.get("/posts/:id", showPost);
router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
