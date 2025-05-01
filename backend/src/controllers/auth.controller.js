import User from "../models/auth.model.js"
import bcrypt from "bcryptjs"
import  generateToken  from "../lib/util.js";


//To handle user signup
export const handleUserSignup = async(req,res) => {
    const {fullName, email, password, phoneNumber, role} = req.body;
    try {
        if(!fullName || !email || !password || !phoneNumber ){
            return res.status(400).json({error : "all fields are required!"})
        }

        if(password.length < 6){
            return res.status(400).json({error :"password should be min 6 characters"})
        }

        if(phoneNumber.length > 10){
            return res.status(400).json({error : "Phone number should be 10 digits"})
        }

        const existingUser = await User.findOne({
            $or : [{email}, {phoneNumber}]
        });
        if(existingUser){
            return res.status(400).json({message : "user already exists!"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword,
            phoneNumber : phoneNumber,
            role : role
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(200).json({message : "user added successfully",
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                phoneNumber : newUser.phoneNumber,
                role : newUser.role
            })
        }else{
            res.status(400).json({message : "Inavid user data"})
        }

    } catch (error) {
        console.log("error in signup controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

// To handle user login
 export const handleUserLogin = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Invaild Credentials!"});
        }

        const isValidUser = await bcrypt.compare(password, user.password);
        if(!isValidUser){
            return res.status(400).json({error : "Invalid Credentials!"})
        }

        generateToken(user._id,res);

        res.status(200).json({
            message : "user logged in successfully",
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role
        })

    } catch (error) {
        console.log("error in login controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

//To handle user logout
export const handleUserLogout = async(req,res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0})
        res.status(200).json({message : "user logged out successfully!"})
    } catch (error) {
        console.log("error in login controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

//To check whether user is logged in or not
export const handleUserCheckAuth = (req,res) => {
    try {
        res.status(200).json({user : req.user})
    } catch (error) {
        console.log("error in check user controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}