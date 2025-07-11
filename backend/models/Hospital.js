const mongoose=require("mongoose");

const hospitalSchema=new mongoose.Schema({
    hospitalname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        lat:Number,
        lng:Number,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports=mongoose.model("Hospital",hospitalSchema);