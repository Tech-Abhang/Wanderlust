const express = require("express")
const app = express()
const session = require("express-session")
const flash = require("connect-flash")

const sessionOptions = {
    secret :"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionOptions));

app.get("/register",(req,res)=>{
    let {name = "anonymus"} = req.query;
    req.session.name = name;
    res.redirect("hello")
})

app.get("/hello",(req,res)=>{
    res.send(`hello ${req.session.name}`)
})

app.listen(3000,()=>{
    console.log("server is listening to 3000")
})