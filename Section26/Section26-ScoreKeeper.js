const player1 = {
    score: 0,
    button: document.querySelector("#player1"),
    display: document.querySelector("#p1")
};

const player2 = {
    score: 0,
    button: document.querySelector("#player2"),
    display: document.querySelector("#p2")
};


// const player1btn = document.querySelector("#player1");
// const player2btn = document.querySelector("#player2");
// const p1 = document.querySelector("#p1")
// const p2 = document.querySelector("#p2")
const reset = document.querySelector("#reset");
const scores = document.querySelector("#scores");
// let score1 = 0;
// let score2 = 0;
let maxScore = parseInt(scores.value);
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score++;
        if (player.score === maxScore) {
            isGameOver = true;
            player.display.classList.toggle("winner");
            opponent.display.classList.toggle("loser");
            player.button.classList.toggle("disabled");
            opponent.button.classList.toggle("disabled");
        }
        player.display.innerText = player.score;
    }
}


scores.addEventListener("change", () => {
    maxScore = parseInt(scores.value);
    resetScores();
})

player1.button.addEventListener("click", () => {
    updateScores(player1, player2);
});
player2.button.addEventListener("click", () => {
    updateScores(player2, player1);
});
reset.addEventListener("click", resetScores);

function resetScores() {
    isGameOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.display.innerText = p.score;
        p.display.classList.remove("winner", "loser");
        p.button.classList.remove("disabled");
    }
    // player1.score = 0;
    // player2.score = 0;
    // player1.display.innerText = player1.score;
    // player2.display.innerText = player2.score;
    // player1.display.classList.remove("winner", "loser");
    // player2.display.classList.remove("winner", "loser");
    // player1.button.classList.remove("disabled");
    // player2.button.classList.remove("disabled");
}
