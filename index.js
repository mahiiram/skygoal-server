import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from "morgan";
import router from "./Router/router.js";

const env = dotenv.config()
const app = express();


app.use(express.json())
app.use(cors({origin:true,credentials:true}))

app.use(morgan('tiny'))
app.disable('x-powered-by')

app.get("/",(req,res)=>{
    console.log("Home Request Server Running Perfectly")
})

app.use('/',router)

const port = process.env.port || 5000
app.listen(port,()=>{
    console.log(`Server Connected to ${port}`)
})


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongodb_url).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})