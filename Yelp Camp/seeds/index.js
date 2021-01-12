const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const Campground = require("../models/campground");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        await new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolore incidunt mollitia nemo obcaecati officiis, quasi velit voluptate voluptatem? Asperiores esse facere, ipsam laborum natus neque provident quam rem unde?",
            price: Math.floor(Math.random() * 20) + 10
        }).save();
    }
}

seedDB()
    .then(() => {
        return mongoose.connection.close();
    })
    .then(() => {
        console.log("Connection closed");
    })