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
    for (let i = 0; i < 200; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        await new Campground({
            // author: "600df7b4ecebe01b01f7a20f",
            author: "601dbafc41154c0fe08a191a",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkvet3ce7/image/upload/v1612141929/YelpCamp/carbon_2_hlcxf2.png',
                    filename: 'YelpCamp/yujvtyzgqcqex7vdgf1f'
                },
                {
                    url: 'https://res.cloudinary.com/dkvet3ce7/image/upload/v1612141928/YelpCamp/carbon_v6ewwl.png',
                    filename: 'YelpCamp/w6unmtffnjxfqzaw5j9x'
                }
            ],
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