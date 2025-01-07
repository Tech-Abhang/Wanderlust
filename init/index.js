//for storing data into database

const mongoose = require("mongoose")
const initData = require("./data.js")

const Listing = require("../models/listing.js") //requiring model

main().then(()=>{
    console.log("connected to db")
}).catch((err) =>{
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//function to store data in model
const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("data is initialized")
}
initDB()