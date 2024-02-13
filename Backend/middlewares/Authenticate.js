import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader === null || authHeader === undefined){
        return res.status(401).json({status:401,message:"UnAuthorized"})
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.secretKey,(err,user)=>{
        if(err){
            return res.status(401).json({status:401,message:"UnAuthorize"})
        }
        // req.user=user;
        // next()
        console.log(user)
    })
}
export default authMiddleware;