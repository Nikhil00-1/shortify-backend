const mongoose=require("mongoose")

const userShcema=new mongoose.Schema(
    {
        name:{
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
            reuired:true,
        }
    },
    {timestamps:true}
);

const user=mongoose.model("user",userShcema);   
module.exports={user};