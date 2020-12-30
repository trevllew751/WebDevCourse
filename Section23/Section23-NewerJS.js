function rollDie(numSides = 6) {        //Default param put "= <value>" directly in the parentheses
    return Math.floor(Math.random() * numSides) + 1;
}

function greet(person, msg = "Hey there", punc = "!") { //Put default params after other params
    console.log(`${msg}, ${person}${punc}`);
}

function sum(...nums) {
    return nums.reduce((total, num) => total + num);
}

const scores = [412512345, 164262, 144132413656, 53143421, 5456246];
const [gold, silver, bronze, ...everyoneElse] = scores;         //Array destructuring

const user = {
    firstName: "Trevor",
    lastName: "Lew",
    email: "Trevllew@gmail.com",
    born: 2001,
    bio: "Yuh",
    city: "Gainesville",
    state: "Virginia"
}

const user2 = {
    firstName: "Senpu",
    lastName: "Tetsuzanken",
    email: "maymays@gmail.com",
    born: 0,
    bio: "Yuh"
}

const {email, firstName, lastName, born: birthYear, } = user;          //Object destructuring
                                    //New variable name birthYear
const {city = "YuhVille", state = "NuhState"} = user2;                 //Object destructuring with default values


function fullName({firstName, lastName = "Nibba"}) {              //Destructuring parameters w/ default values
    return `${firstName} ${lastName}`
}