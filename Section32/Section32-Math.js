const add = (x, y) => x + y;
const PI = 3.14159;
const square = x => x ** 2;

// First way of exporting
// module.exports.add = add;
// module.exports.PI = PI;
// module.exports.square = square;

// Second way of exporting
const math = {
    add: add,
    PI: PI,
    square: square
}

module.exports = math;

// Third way of exporting
// module.exports.add = (x, y) => x + y;
// module.exports.PI = 3.14159;
// module.exports.square = x => x**2;

