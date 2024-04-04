const mongoose=require('mongoose')

const transactionSchema=mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    type:{
        type:String,
        required:[true,"Type is required"],
    },
    category:{
        type:String,
        required:[true,"category is required"],
    },
    reference:{
        type:String
    }, 
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:[true,"date is required"]
    },

    
},{timestamps:true})
const transactionModel=mongoose.model('transaction',transactionSchema);
module.exports = transactionModel;