const mongoose=require("mongoose")

const connectMongo=async (url)=>{
    
    return mongoose.connect(url)
    .then(()=>console.log("Mongo is Connected...."))
    .catch((err)=>{console.log(err);
})
};

module.exports={connectMongo};