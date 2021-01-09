const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const personSchema = new mongoose.Schema({
    first:String,
    last:String
})

personSchema.virtual("fullName").get(function () {
    return `${this.first} ${this.last}`;
})
    .set(function (newFullName) {
        const first = newFullName.substring(0, newFullName.indexOf(' '));
        const last = newFullName.substring(newFullName.indexOf(' ') + 1);
        this.set({first, last});
    })

personSchema.pre("save", async function () {    // Middle-ware that runs before the save() method
    console.log("About to save")
})

personSchema.post("save", async function () {   // Middle-ware that runs after the save() method
    console.log("Saved!")
})

const Person = mongoose.model("Person", personSchema);

