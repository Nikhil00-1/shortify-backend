const { links } = require("../Model/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const handlePastLinks = async (req, res) => {
  const tokn = req.cookies?.uid;

  if (!tokn) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(tokn, process.env.JWT_SECRET);    
    ObjectId = decoded._id;
    
    const linkHistory = await links.find({ createdBy: ObjectId });
    return res.json(linkHistory);
  } catch (err) {
    console.error("Something Went Wrong", err);
    res.status(500).json({ error: "Invalid token or server error" });
  }
};

module.exports = { handlePastLinks };
