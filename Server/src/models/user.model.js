import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    hashPassword : {
        type : String,
        required : true,
        minLength : [6, "password is too short"]
    },
    role : {
        type : String,
        default : "user",
        enum : ["admin", "user"],
    },
    refreshToken : {
        type : String
    }
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;