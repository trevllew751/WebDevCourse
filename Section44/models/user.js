const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true})
    .then(() => {
        console.log("DB Connection Open");
    })
    .catch((err) => {
        console.log("Error connecting to database");
        console.log(err);
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [{
        _id: {idL:false},
        city: String,
        state: String,
        country: String,
        street: String
    }]
})

const User = mongoose.model("User", userSchema);

const makeUser  = async () => {
    const u = new User({
        first:"Harry",
        last:"Potter",
    })
    u.addresses.push({
        street:"123 Baker Lane",
        city: "Cleveland",
        state: "OH",
        country: "United States"
    })
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street:"456 Siberia Algeria",
        city: "Cleveland",
        state: "OH",
        country: "United States"
    })
    const res = await user.save();
    console.log(res);
}
addAddress("6000ccb778778c9f943a4dfe");
// makeUser();