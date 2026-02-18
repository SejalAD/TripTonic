

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { init } = require("../models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// const dbUrl = process.env.ATLAS_URL;

main()
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err));


async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"697dac51645e84b56309d686",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was saved");
}

initDB();