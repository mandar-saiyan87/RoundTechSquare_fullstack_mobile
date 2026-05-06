import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function authMddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: no valid token provided"
            })
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: no valid token provided"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decode.userId).select("-password")

        next()

    } catch (error) {
        console.error(`Auth middleware error: ${error}`)
        res.status(401).json({
            message: "Unauthorized: invalid token"
        })
    }

}