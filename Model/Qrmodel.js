const mongoose=require("mongoose"); 

const schema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    CloudUrl:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }},
    {timestamps:true}
);

const Qrs=mongoose.model("QR Model",schema);

module.exports={Qrs};