const mongoose = require("mongoose")
const Schema = mongoose.Schema

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        //if null , undefined
        default:"https://unsplash.com/photos/a-person-standing-on-a-beach-at-sunset-6liNQHL2Yjk",
        //if empty
        set:(v)=> v === ""? "https://unsplash.com/photos/a-person-standing-on-a-beach-at-sunset-6liNQHL2Yjk": v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }]
})

const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing