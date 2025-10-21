const {handleNewUrl,handleUlrequest}=require("../controllers/index")
const {handleNewQR}=require("../controllers/QRgenerator")
const {handlePastQr}=require("../controllers/pastQrs")
const {handlePastLinks}=require("../controllers/pastlinks")
const {handleProfile}=require("../controllers/Profile")
const express=require("express")

const router=express.Router()

router
.route("/profile")
.get(handleProfile)

router
.route("/")
.post(handleNewUrl)

router
.route("/qr")
.post(handleNewQR)

router
.route("/history/links")
.get(handlePastLinks)

router
.route("/history/qrs")
.get(handlePastQr)

router
.route("/:id")
.get(handleUlrequest)

module.exports={router};