import mongoose from "mongoose";
import sampleReports from "./data.js";
import Report from "../models/accidents/Reports.js";

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
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
