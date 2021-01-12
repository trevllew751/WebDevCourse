const express = require("express");
const app = express();
const path = require("path");
const Product = require("./models/product");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/farmStand2', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => {
            next(e);
        })
    }
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.listen(3000, () => {
    console.log("Open on port 3000");
})

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", wrapAsync(async (req, res, next) => {
    const {category} = req.query;
    if (category) {
        const products = await Product.find({category});
        res.render("products/index", {products, category});
    } else {
        const products = await Product.find({});
        res.render("products/index", {products, category: "All"});
    }

}))

app.get("/products/new", (req, res) => {
    res.render("products/new", {categories});
})

app.get("/products/:id", wrapAsync(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 404)
    }
    res.render("products/product", {product});
}))

app.post("/products", wrapAsync(async (req, res, next) => {
    const newProduct = await new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct.id}`);
}))

app.get("/products/:id/edit", wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError("Product not found", 404))
    }
    res.render("products/edit", {product, categories});
}))

app.put("/products/:id", wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product.id}`);
}))

app.delete("/products/:id", async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
})

const handleValidationErr = (err => {
    console.dir(err);
    return new AppError(`Validation failed...${err.message}`, 400);
})

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") {
        err = handleValidationErr(err);
    }
    next(err);
})

app.use((err, req, res, next) => {
    const {status = 500, message = "Error!"} = err;
    res.status(status).send(message);
})

app.get("/*", (req, res) => {
    res.send("Error 404")
})
