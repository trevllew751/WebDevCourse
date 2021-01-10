const Product = require("./models/product");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const p = new Product({name: "Grapefruit", price: 1.99, category: "fruit"});
p.save()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

const seedProducts = [
    {
        name: "Orange",
        price: 1.50,
        category: "fruit"
    },
    {
        name: "Watermelon",
        price: 8.00,
        category: "fruit"
    },
    {
        name: "Cheese",
        price: 7.50,
        category: "dairy"
    }
]

Product.insertMany(seedProducts)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })