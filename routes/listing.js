const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema} = require("../schema.js")
const ExpressError = require("../utils/expressError.js")
const Listing = require("../models/listing.js")

const validateListing = (req,res,next)=>{
    let {error}= listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next()
    }
}

//index route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs",{allListings})
}))

//new
router.get("/new", wrapAsync(async (req,res)=>{
    res.render("listings/new.ejs")
}))

//show
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id).populate("reviews")
    if (!listing) {
        req.flash("error", "Listing not found!")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing})
}))


//add
router.post("/",validateListing, wrapAsync(async (req,res,next) =>{
    const newListing = new Listing(req.body.listing)
    await newListing.save()
    req.flash("success", "New listing created successfully!")
    res.redirect("/listings")
    })
)

//edit
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "Listing not found!")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{listing})
}))

//update
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success", "Listing updated successfully!")
    res.redirect(`/listings/${id}`)
}))

//delete
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted successfully!")
    res.redirect("/listings")
}))

module.exports = router