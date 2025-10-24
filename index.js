const express=require("express");
const app=express();
const {connectMongo}=require("./connection");
const {router}=require("./Routes/index")
const {userRouter}=require("./Routes/User")
const {getRouter}=require("./Routes/getRouter")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const {restrictToLoginUserOnly}=require("./Middlewares/auth");
require("dotenv").config();


const PORT = process.env.PORT || 3000;

app.use(cors({
  origin:  process.env.CLIENT_URL,  
  credentials: true
}));
app.use(express.json());
connectMongo(process.env.MONGO_URL);

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/shortify",restrictToLoginUserOnly,router)
app.use("/user",userRouter)
app.use("/",getRouter)

app.get("/check-env", (req, res) => {
  res.json({ clientUrl: process.env.CLIENT_URL });
});

app.listen(PORT,()=>console.log(`App is running at ${PORT}`));