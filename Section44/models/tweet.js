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


const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema)

const makeTweets = async () => {
    const u = await User.findOne({username: "Yuhman"});
    const tweet2 = new Tweet({text: "WOLOOLOLOLOLOLLOLOL", likes: 69});
    tweet2.user = u;
    u.save();
    tweet2.save();
}

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate("user");
    console.log(t)
}

findTweet();