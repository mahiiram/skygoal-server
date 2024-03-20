import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()
export async function Auth(req,res,next){
    
    try {
        const token = req.headers.authorization.split(" ")[1]
        
        const decodedtoken= await jwt.verify(token,process.env.secretkey)
         
          req.user = decodedtoken;
          next()
    } catch (error) {
        res.status(401).json({error:"Authentication error"})
    }
}