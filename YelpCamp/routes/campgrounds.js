const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Campground = require("../models/campground");
const {isLoggedIn, isAuthor, validateCampground} = require("../middleware");


router.get("/", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
})

router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const camp = await new Campground(req.body.campground);
    camp.author = req.user.id;
    await camp.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${camp.id}`);
}))

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

router.get("/:id", catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        }).populate("author");
    console.log(camp);
    if (!camp) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {camp});
}))

router.get("/:id/:edit", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {camp});
}))

router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${id}`);
}))

router.delete("/:id", catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Deleted campground!");
    res.redirect("/campgrounds");
}))

module.exports = router;