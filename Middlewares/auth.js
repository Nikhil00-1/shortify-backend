
const {getUser}=require("../Service/auth")

const restrictToLoginUserOnly=(req,res,next)=>{
    const userUid=req.cookies?.uid;
    if (!userUid) return res.json({message:"User is not logged in, Please login to continue!"});
    

    const user=getUser(userUid);
    if (!user) return res.json({message:"User is not logged in, Please login to continue!"})
    
    req.user=user;
    next();
}
module.exports={
    restrictToLoginUserOnly
}