const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName: {
        type:String
    },
    emailId : {
        type:String,
        required:true,
        unique:true,
        lowercaes:true,
        trim:true,
        validate(value){
        if(!validator.isEmail(value)){
        throw new Error("Invalid email:" + value);
        
        }
        }
    },
    password: {
        type: String,
        required:true,
        validate(value){
if(validator.isStrongPassword(value)){
throw new Error("Enter a strong Password: " + value)
}
        }
    },
    age: {
        type:Number,
        min:18
    },
    gender: {
        type:String,
        vaildate(value){
if(!["male", "female", "other"].includes(value)){
throw new Error("Gender data is not valid")
}}
    },
    photoUrl:{
        type:String,
        default:"",
        validate(value){
if(validator.isURL(value)){
throw new Error("Invalid photo url: " + value)
}
        }
    },
    skill:{
        type:[String]
    }
   },
    {
        timestamps:true
    }
) 

module.exports = mongoose.model('User',userSchema)