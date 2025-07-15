// all requires..........
const express=require("express");
const mongoose=require("mongoose");
const authRoutes = require("./routes/authRoutes");
const reportRoutes=require("./routes/reportRoutes")
const cors=require("cors");


const app=express();

// all use .......................
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reports",reportRoutes);


// to connect mongoose ...........
mongoose.connect("mongodb://127.0.0.1:27017/adrs",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));


app.listen(3000,()=>{
    console.log("listenning to port 3000")
})