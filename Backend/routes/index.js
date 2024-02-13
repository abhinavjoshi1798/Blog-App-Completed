import {Router} from "express"
import AdminRoutes from "./adminRoutes.js"
import UserRoutes from "./userRoutes.js"
// import PostRoutes from "./postRoutes.js"
// import CommentRoutes from "./commentsRoutes.js"


import authMiddleware from "../middlewares/Authenticate.js"
import ProfileController from '../controllers/ProfileController.js'
import AuthController from "../controllers/AuthController.js"


const router = Router()

router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)

//Private Route
router.get("/profile",authMiddleware,ProfileController.index)

router.use("/admin",AdminRoutes)

router.use("/user",UserRoutes)

// router.use("/user",UserRoutes)
// router.use("/post",PostRoutes)
// router.use("/comment",CommentRoutes)

export default router