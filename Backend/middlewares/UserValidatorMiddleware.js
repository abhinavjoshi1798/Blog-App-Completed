import jwt from "jsonwebtoken";

export const userValidatorMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ status: 401, message: "Token verification failed" });
        }

        if (user.role !== 'user') {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }

        next();
    });
};
