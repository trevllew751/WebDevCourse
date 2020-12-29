const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// function print(element) {
//     console.log(element);
// }
//
// numbers.forEach(print)

// numbers.forEach(function (element) {
//     if (element % 2 === 0) {
//         console.log(element);
//     }
// })

// let doubles = numbers.map(function(num) {
//     return num * 2;
// })

// const add = function (x, y) {
//     return x + y;
// }

// const add = (x, y) => { //arrow function syntax does the same thing as above
//     return x + y;
// }

const square = (x) => { //can leave out parens if there is only one parameter
    return x ** 2;
}

// const rollDie = () => {
//     return Math.floor(Math.random() * 6) + 1;
// }

const rollDie = () => (                 //Implicit return, replace {} with () if there's only 1 line
    Math.floor(Math.random() * 6) + 1
)

const add = (x, y) => x + y;            //Implicit return, one liner implicit return

// console.log("Hello....")
// setTimeout(() => console.log("... are you still there?"), 3000)
// console.log("Goodbye")

// const id = setInterval(() => console.log(Math.random()), 2000);

//clearInterval(2) --> stops the interval

const lessThanTen = numbers.filter(n => n < 10);

// let sum = 0;
// for (let num of numbers) {
//     sum += num;
// }

const sum = numbers.reduce((total, num) => total + num);

const max = numbers.reduce((big, num) => Math.max(big, num));
const min = numbers.reduce((smol, num) => Math.min(smol, num));
// can add a second argument which acts as the initial condition
