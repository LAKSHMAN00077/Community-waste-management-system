import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const protectedRoute = async(req,res,next) => {
    const token = req.cookies.jwt;
    try {
        if(!token){
            return res.status(400).json({message : "Unauthorized - No Token is Provided"});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            res.status(400).json({message : "Unauthorized - Token is Invalid"})
        }
    
        const user = await User.findById(decoded.userId);
    
        if(!user){
            res.status(400).json({message : "No user found"})
        }
    
        req.user = user;

        next();


    } catch (error) {
        console.log("error in auth middleware : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}


export const isAdmin = (req,res,next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({message :"Unauthorized - Admin access only!"})
    }
}