const jwt = require("jsonwebtoken");
require("dotenv").config();
const { user } = require("../Model/User");

const handleProfile=async (req,res)=>{
    const tokn = req.cookies?.uid;
    
      if (!tokn) {
        return res.status(401).json({ message: "No token found" });
      }
    
      try {
        const decoded = jwt.verify(tokn, process.env.JWT_SECRET);    
        ObjectId = decoded._id;
        
        const Info = await user.findById(ObjectId);
      
        return res.json(Info);
      } catch (err) {
        console.error("Something Went Wrong");
        res.status(500).json({ error: "Invalid token or server error" });
      }
};

module.exports={handleProfile};