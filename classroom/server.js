const express = require("express")
const app = express()
const session = require("express-session")
const flash = require("connect-flash")
const path  = require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

const sessionOptions = {
    secret :"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionOptions));
app.use(flash())

app.get("/register",(req,res)=>{
    let {name = "anonymus"} = req.query;
    req.session.name = name;
    if (name === "anooymus"){
        req.flash("error","user not found")
    }else{
        req.flash("sucess","user registered sucessfully")
    }

    req.flash("sucess","user registered sucessfully")
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    res.locals.messages = req.flash("sucess")
    res.render("page.ejs",{name : req.session.name})
})

app.listen(3000,()=>{
    console.log("server is listening to 3000")
})