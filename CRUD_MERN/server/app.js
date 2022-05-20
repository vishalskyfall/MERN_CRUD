//express and app start 
require("dotenv").config();
const express = require('express')
const app =  express();

//port listening 
const port = 8003;
app.listen(port,()=>{
    console.log("Server is running "); 
})

//db and model schema connections
const mongoose = require("mongoose")
require("./db/conn")
const users = require("./models/userSchema")

//cors
const cors = require("cors");

app.use(cors())
app.use(express.json())
 

//router
const router = require("./routes/router");
app.use(router)
