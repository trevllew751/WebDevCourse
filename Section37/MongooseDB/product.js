const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // This attribute is required or it will throw an error when trying to save
        maxlength: 20   // Additional String attribute
    },
    price: {
        type: Number, // Requires something that can be converted into a number, will throw an error if not possible
        required: true,
        min: [0, "Price must be positive"] // The string is a custom error message for validation
    },
    onSale: {
        type: Boolean,
        default: false // Can set default values for attributes if they are not specified
    },
    categories: [String], // Can add an attribute with an array type
    qty: {              // Can nest objects in the schema
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
})

// productSchema.methods.greet = function() {
//     console.log("Hello there. GENERAL KENOBI!")
//     console.log(`- from ${this.name}`);
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price:0})
}

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({name:"i9-10900k"});
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory("Nigerians Niberians");
    console.log(foundProduct);

}
// findProduct();
Product.fireSale().then(res => console.log(res));

const graphicsCard = new Product({name: "RTX 3090", price: 700}); // If you add attributes that are not defined in the schema they are ignored
// graphicsCard.save()
//     .then(data => {
//         console.log("Success");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh no", err);
//     })

const cpu = new Product({name: "i9-10900k", price: 520, onSale: false, categories: ["computer", "tech"]});
// cpu.save()
//     .then(data => {
//         console.log("Success");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh no", err);
//     })

// Product.findOneAndUpdate({name: "RTX 3090"}, {"qty.online": 4}, {new: true, runValidators: true}) // Option runValidators ensures that update values pass requirements set in the schema
//     .then(data => {
//         console.log("Success");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh no", err);
//     })

