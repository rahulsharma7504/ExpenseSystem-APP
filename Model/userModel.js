const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"emal is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"Password should be at least 6 characters long."]
    }, 
    
},
{timestamps:true}
);

const User=mongoose.model('User',userSchema);

module.exports=User;