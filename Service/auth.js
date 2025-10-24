const jwt=require("jsonwebtoken")
require("dotenv").config();
const secret="ShortIFY@***"

const setUser=(user)=>{
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
        },JWT_SECRET );
};

const getUser=(token)=>{
    return jwt.verify(token,JWT_SECRET);
}

module.exports={setUser,getUser}; 