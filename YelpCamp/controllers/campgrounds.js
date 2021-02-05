const Campground = require("../models/campground");
const {cloudinary} = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapToken});
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
}

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new")
}

module.exports.createCampground = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    const camp = await new Campground(req.body.campground);
    camp.geometry = geoData.body.features[0].geometry;
    camp.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    camp.author = req.user.id;
    await camp.save();
    console.log(camp);
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
    console.log(req.body);
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const images = req.files.map(f => ({url: f.path, filename: f.filename}))
    camp.images.push(...images);
    await camp.save();
    if (req.body.deleteImages) {
        for (let file of req.body.deleteImages) {
            await cloudinary.uploader.destroy(file);
        }
        await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Deleted campground!");
    res.redirect("/campgrounds");
}