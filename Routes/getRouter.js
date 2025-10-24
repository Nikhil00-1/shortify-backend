const {handleUlrequest}=require("../controllers/index")
const express=require("express")

const getRouter=express.Router()

getRouter
.route("/:id")
.get(handleUlrequest)

module.exports={getRouter};