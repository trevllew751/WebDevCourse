// function add(x, y) {
//     return x + y;
// }


// const add = function (x, y) {
//     return x + y;
// }

// add(3,4); //Calling the function

// function callTwice(func) {
//     func();
//     func();
// }
//
// function rollDie() {
//     const roll = Math.floor(Math.random() * 6) + 1;
//     console.log(roll)
// }
//
// callTwice(rollDie);

// function makeMysteryFunc() {
//     const rand = Math.random();
//     if (rand > 0.5) {
//         return function () {
//             console.log('Good function')
//         }
//     }
//     return function () {
//         console.log("Bad function")
//     }
// }
//
// function makeBetweenFunc(min, max) {
//     return function(num) {
//         return num >= min && num <= max;
//     }
// }

const myMath = {
    PI: 3.14159,
    // square: function (num) {
    //     return num**2;
    // },
    // cube: function (num) {
    //     return num**3;
    // }
    square(num) {           //Short hand syntax
        return num**2;
    },
    cube(num) {
        return num**3;
    }
}

console.log(myMath.square(11))
console.log(myMath.cube(3));


const dog = {
    name: "Meatball",
    color: "Black",
    breed: "German Shepherd",
    speak() {
        console.log("This is ", this)
        console.log(`${this.name} says 'woof!'`);
    }
}

const pup = dog.speak;


try {
    nibbas.toUpperCase();
} catch (error) {
    console.log(error)
}