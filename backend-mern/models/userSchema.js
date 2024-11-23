const mongoose = require('mongoose')


const userSchema  = new mongoose.Schema({
        username  : {
              type : String,
              required:true,
              unique:true
        },
        email : {
              type:String,
              required:true,
              unique:true
        },
        mobilenumber:{
              type:Number,
              unique:true,
              required:true
        },
        designation:{
             type:String,
             required:true
        },
        gender : {
              type:String,
              required:true
        },
        course : {
              type: Array,
              required : true
        },
        image : {
              type: String,
              required:true
        },
        password: {
             type : String,
             required : true
        },
        createAt : {
             type : String,
             default: Date.now()
        }
} 
)

module.exports = mongoose.model('user' , userSchema)

