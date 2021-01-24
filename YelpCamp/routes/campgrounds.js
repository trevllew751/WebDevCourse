const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Campground = require("../models/campground");
const {campgroundSchema} = require("../schemas");
const ExpressError = require("../utilities/ExpressError");
const {isLoggedIn} = require("../middleware");

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get("/", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
})

router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const camp = await new Campground(req.body.campground);
    camp.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${camp.id}`);
}))

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

router.get("/:id", catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate("reviews");
    if (!camp) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {camp});
}))

router.get("/:id/:edit", isLoggedIn, catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {camp});
}))

router.put("/:id", isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    // Above line spreads the campground object in the req.body and updates the current campground
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${id}`);
}))

router.delete("/:id", catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Deleted campground!");
    res.redirect("/campgrounds");
}))

module.exports = router;