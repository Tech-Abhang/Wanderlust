const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")// helps for includes(common code)
const ExpressError = require("./utils/expressError.js")
const session = require("express-session")
const flash = require("connect-flash")
const User = require("./models/user.js")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

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
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//db
main().then(()=>{
    console.log("connected to db")
}).catch((err) =>{
    console.log(err)
});

async function main() {
  const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/wanderlust';
  await mongoose.connect(dbUrl);
}

app.get("/",(req,res)=>{
    res.send("Welcome to wanderlust , route to /listings to see all listings")
})


app.use((req,res,next) =>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

app.use("/listings",listingsRouter)
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/",userRouter)


app.use((err,req,res,next)=>{
    let{statusCode = 500,message = "somethings wrong"} = err
    res.status(statusCode)
    res.render("error.ejs",{message})
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})



