const mongoose=require("mongoose");
const sampleReports=require("./data.js");
const Report=require("../models/accidents/Reports.js");

main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err);
})  

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/adrs")
}

const initDB=async()=>{
    await Report.deleteMany({});
    await Report.insertMany(sampleReports);
    console.log("data was initialised")

};
initDB();