// const math = require("./Section32-Math");
// console.log(math.add(1,2));
// console.log(math.PI);

const {PI, square} = require("./Section32-Math"); //destructure the module
// console.log(PI);
// console.log(square(9));

const cats = require("./Section32-Include");
console.log("Require entire directory: ", cats);