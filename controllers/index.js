const {links}=require("../Model/index")
const shortid = require('shortid');


const handleNewUrl=async (req,res)=>{
    const url=req.body.url
    const short=shortid()

    const isValidUrl = (string) => {
            try {
                new URL(string);
                return true;
            } catch {
                return false;
            }
        };
        const isValidUrl2 = (string) => {
            const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;
            console.log(pattern.test(string));
            return pattern.test(string);
        };
        if (!isValidUrl(url) && !isValidUrl2(url)) {
            return res.json({ message: "Enter Valid URL" });
        }

    const result=await links.create({
        url:url,
        shortUrl:short,
        visitHistory:[],
        createdBy:req.user._id,   
    });
    const shorturl=`https://shortify-ezjl.onrender.com/${short}`
    res.status(201).json({shorturl})
};

const handleUlrequest=async (req,res)=>{
    const id=req.params.id
    
    const link=await links.findOne({shortUrl:id})
    console.log(link.url);
    
    return res.redirect(link.url)
};

module.exports={handleUlrequest,handleNewUrl}