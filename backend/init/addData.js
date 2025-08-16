import mongoose from "mongoose";
import sampleReports from "./data.js";
import Report from "../models/accidents/Reports.js";

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/adrs");
        console.log("Connected to DB");
    } catch (err) {
        console.error(err);
    }
}

const initDB = async () => {
    await Report.deleteMany({});
    await Report.insertMany(sampleReports);
    console.log("Data was initialised");
};

main().then(initDB);
