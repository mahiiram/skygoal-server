import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    phonenumber:{
        type: String, 
        unique:true
    }    
},{ 
    timestamps:true,
})


const usermodel = mongoose.model('User',userSchema)
export default usermodel;