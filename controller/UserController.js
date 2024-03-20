import usermodel from "../model/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


const env = dotenv.config()

export async function getuser(req,res){  //getuser by token
     
      const {userId} = req.user
    try {
        let user = await usermodel.findById({_id:userId}).select('-password')
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        res.status(200).json(user)
    } catch (error) {
     console.log(error)
     res.status(500).json({ message: 'Server Error' });
    }
}


export async function UserRegister(req, res) {
    const { email, password, username, phonenumber } = req.body;

    try {
        let user = await usermodel.findOne({ email });

        if (user) {
            return res.status(400).json({
                Message: "User email already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new usermodel({
            email,
            password: hashedPassword,
            username,
            phonenumber
        })

        await user.save()

        return res.status(201).json({
            message: "user Register successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


export async function userLogin(req, res) {
    const { EmailOrPhonenumber, password } = req.body;

    try {
        let user = await usermodel.findOne({ email: EmailOrPhonenumber })

        if (!user) {
            user = await usermodel.findOne({ phonenumber: EmailOrPhonenumber })
        }
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or PhoneNumber"
            })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.secretkey, {
            expiresIn: "1d"
        })

        return res.status(201).json({
            message: "Login Sucessfully",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


export async function updateUser(req, res, next) {
    const { userId } = req.user;
    const {
        username,
        password,
        email,
        phonenumber
    } = req.body;


    let user;
    try {
        user = await usermodel.findByIdAndUpdate({ _id: userId }, { username, email, password, phonenumber })
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        res.status(500).json({
            message: "Something Went Wrong"
        })
    }
    return res.status(201).json({
        message: "Updated Successfully"
    })
}