const {handleSignUp,handleLogin,handleLogOut,handleLogStatus}=require("../controllers/User")
const express=require("express")

const userRouter=express.Router()

userRouter
.route("/signup")
.post(handleSignUp)
    
userRouter
.route("/login")
.post(handleLogin)

userRouter
.route("/logout")
.post(handleLogOut)

userRouter
.route("/logStatus")
.get(handleLogStatus)

module.exports={userRouter};