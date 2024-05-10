const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
// const loginRoute = require("./routes/auth");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");
})

//midleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
// app.use("/api/login",loginRoute);

app.listen(8800,()=>{
    console.log("Backend server is running!");
});