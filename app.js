const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")// helps for includes(common code)
const ExpressError = require("./utils/expressError.js")
const session = require("express-session")


const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"public")))


//sessions
const sessionOptions ={
    secret : "mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 *60 * 1000,
        maxAge:7 * 24 * 60 *60 * 1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions))

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

app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)


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
    let{statusCode = 500,message = "somethings wrong"} = err
    res.status(statusCode)
    res.render("error.ejs",{message})
    // res.send("something went wrong")
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})

app.listen(8080,()=>{
    console.log("listening to port 8080")
})



