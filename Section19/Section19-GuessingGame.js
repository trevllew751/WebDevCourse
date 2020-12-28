let guessCount = 1;
let maxNumber = parseInt(prompt("Enter a maximum number"));
while (!maxNumber) {
    maxNumber = parseInt(prompt("Enter a valid number"));
}
const answer = Math.floor(Math.random() * maxNumber) + 1;
let guess = parseInt(prompt("What is your first guess?"));
while (parseInt(guess) !== answer) {
    guessCount++;
    if (guess === "q") {
        break;
    }
    if (guess < answer) {
        guess = prompt("Too Low. Guess again");
    } else {
        guess = prompt("Too high. Guess again");
    }
}
if (guess === "q") {
    console.log("Quit");
} else {
    console.log(`It took you ${guessCount} guesses.`);
}