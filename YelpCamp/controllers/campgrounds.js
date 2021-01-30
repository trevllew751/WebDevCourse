const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
}

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new")
}

module.exports.createCampground = async (req, res) => {
    const camp = await new Campground(req.body.campground);
    camp.author = req.user.id;
    await camp.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${camp.id}`);
}

module.exports.showCampground = async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!camp) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {camp});
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {camp});
}

module.exports.updateCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Deleted campground!");
    res.redirect("/campgrounds");
}