const jwt=require("jsonwebtoken")
const secret="ShortIFY@***"

const setUser=(user)=>{
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
        },secret);
};

const getUser=(token)=>{
    return jwt.verify(token,secret);
}

module.exports={setUser,getUser}; 