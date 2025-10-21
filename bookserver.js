const express = require("express");
const app = express();
const cors=require("cors");
 
 const r = require("./Routers/bookRoute");


app.use(cors());

app.use(express.json());
app.use("/",r);

 app.listen(3000,()=>{
    console.log("server is Running on ......");
 })