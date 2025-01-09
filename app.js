const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")// helps for includes(common code)

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"public")))

//db
main().then(()=>{
    console.log("connected to db")
}).catch((err) =>{
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/",(req,res)=>{
    res.send("hi i am root")
})

app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs",{allListings})
})

//new
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//read
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs",{listing})
})


//add
app.post("/listings",async (req,res,next) =>{
    try{
        const newListing = new Listing(req.body.listing)
    await newListing.save()
    res.redirect("/listings")
    }catch(err){
        next(err)
    }
    
})

//edit
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})

//update
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})

//delete
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         description:"by the beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     })
//     await sampleListing.save();
//     console.log("sample was saved")
//     res.send("sucessful testing")
// })

app.use((err,req,res,next)=>{
    res.send("something went wrong")
})


app.listen(8080,()=>{
    console.log("listening to port 8080")
})

