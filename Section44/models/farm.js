const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("DB Connection Open");
    })
    .catch((err) => {
        console.log("Error connecting to database");
        console.log(err);
    })


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['spring', 'summer', 'fall', 'winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

Product.insertMany([
    {name: "Naval Orange", price: 1.99, season: "summer"},
    {name: "Watermelon", price: 1.99, season: "spring"},
    {name: "Mango", price: 3.99, season: "summer"}
])


const makeFarm = async () => {
    const farm = new Farm({name: "Big Farm", city: "Yuhville, CA"});
    const melon = await Product.findOne({name: "Watermelon"});
    farm.products.push(melon);
    await farm.save()
    console.log(farm)
}


const addProduct = async () => {
    const farm = await Farm.findOne({name: "Big Farm"});
    const borange = await Product.findOne({name: "Naval Orange"});
    farm.products.push(borange);
    await farm.save();
    console.log(farm);
}


Farm.findOne({name: "Big Farm"})
    .populate({path:"products", model:"Product"})
    .then(farm => console.log(farm));
