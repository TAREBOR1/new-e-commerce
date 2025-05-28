const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
     username:{
        type:String,
        unique:true,
        required:true
     },
     Email:{
        type:String,
        unique:true,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
       default:'user'
     },
})


const User= mongoose.model('User',UserSchema)

module.exports=User;