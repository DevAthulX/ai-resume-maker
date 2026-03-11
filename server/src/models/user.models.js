const mongoose = require('mongoose');


const userSchema = new mongoose.SchemaType({
    username:{
        type:String,
        required:true,
        unique:[true,"Username already exists"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("User",userScheme);
module.exports = userModel