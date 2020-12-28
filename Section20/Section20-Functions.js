function singSong() {
    console.log("DO");
    console.log("RE");
    console.log("MI");
}
// singSong();

function greet(firstName, lastName) {
    console.log(`Hey there, ${firstName} ${lastName[0]}!`)
}

function repeat(msg, repeatNum) {
    let result = ""
    for (let i = 0; i < repeatNum; i++) {
        result += msg;
    }
    console.log(result);
}

function add(num1, num2) {
    return num1 + num2;
}