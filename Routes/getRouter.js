const {handleUlrequest}=require("../controllers/index")
const express=require("express")

const getRouter=express.Router()

router
.route("/:id")
.get(handleUlrequest)

module.exports={getRouter};