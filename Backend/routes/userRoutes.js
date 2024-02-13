import { Router } from "express"
import { fetchPosts } from "../controllers/postController.js"
import { createComment } from "../controllers/commentController.js"
import { userValidatorMiddleware } from "../middlewares/UserValidatorMiddleware.js"

const router = Router()

router.get("/posts",fetchPosts)
router.post("/createcomment",userValidatorMiddleware,createComment)

export default router