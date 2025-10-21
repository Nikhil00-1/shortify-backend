const mongoose=require("mongoose"); 

const schema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortUrl:{
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

const links=mongoose.model("Short-URL",schema);

module.exports={links};