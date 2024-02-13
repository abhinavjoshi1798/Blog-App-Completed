import { Router } from "express";
import { createComment, deleteComment, fetchComments, showComments, updateComment } from "../controllers/commentController.js";


const router = Router();

router.get("/", fetchComments);
router.get("/:id", showComments);
router.post("/createcomment", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
