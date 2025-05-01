import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        phoneNumber : {
            type : String,
            required : true,
            unique : true,
        },
        role : {
            type: String,
            enum : ['user','admin'],
            default :'user'
        },
        profilePic :{
            type : String,
            default : ""
        }
        
    },{timestamps : true}
)




userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User;