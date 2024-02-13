export const createPostValidatorMiddleware = (req, res, next) => {
    const { user_id, image, title, description } = req.body;
    if (!user_id || !image || !title || !description) {
        return res.status(400).json({ message: "Required fields are missing" });
    }
    next();
};
