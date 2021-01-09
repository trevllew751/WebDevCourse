const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model("Movie", movieSchema); // Mongoose creates a collection called "movies". Name should be capitalized and singular
const pacificRim = new Movie({title: "Pacific Rim", year: 2013, score: 8.8, rating: "PG-13"});

Movie.insertMany([
    {title: "Kung Fu Panda", year: 2010, score: 8.7, rating: "PG"},
    {title: "Kung Fu Panda 2", year: 2013, score: 8.9, rating: "PG"},
    {title: "Kung Fu Panda 3", year: 2016, score: 8.8, rating: "PG"},
])
    .then(data => {
        console.log("It worked");
        console.log(data)
    })
    .catch(err => {
        console.log(err);
    })