let timer;
const timerElement = document.getElementById("timer");

function updateTimerDisplay(time) {

    if (time < 0) {
        timerElement.textContent = "Time's up!";
    } else {
        timerElement.textContent = `Time left: ${time} seconds`;
    }
}


function startTimer(seconds, callback) {
    clearInterval(timer);
    let time = seconds;
    updateTimerDisplay(time);

    timer = setInterval(() => {
        time--;
        updateTimerDisplay(time);

        if (time <= 0) {
            clearInterval(timer);
            callback(); // Execute the callback function when the timer runs out
        }
    }, 1000);
}

const Questions = [{
	q: "How many days do we have in a week?",
	a: [{ text: "Two", isCorrect: false },
	{ text: "Four", isCorrect: false },
	{ text: "Seven", isCorrect: true },
	{ text: "Nine", isCorrect: false }
	]

},
{
	q: "Which animal is known as the Ship of the Desert?",
	a: [{ text: "Lion", isCorrect: false, isSelected: false },
	{ text: "Elephant", isCorrect: false },
	{ text: "Tiger", isCorrect: false },
	{ text: "Camel", isCorrect: true }
	]

},
{
	q: "Which month of the year has the least number of days?",
	a: [{ text: "May", isCorrect: false },
	{ text: "June", isCorrect: false },
	{ text: "February", isCorrect: true },
	{ text: "April", isCorrect: false }
	]

},
{
	q: "Which is the largest animal in the world?",
	a: [{ text: "Tiger", isCorrect: false },
	{ text: "Elephant", isCorrect: false },
	{ text: "Blue whale", isCorrect: true },
	{ text: "Lion", isCorrect: false }
	]

},
{
	q: "Which festival is known as the festival of colors",
	a: [{ text: "Diwali", isCorrect: false },
	{ text: "Holi", isCorrect: true },
	{ text: "Ramzan", isCorrect: false },
	{ text: "Ugadi", isCorrect: false }
	]

}

];

let currQuestion = 0;
let score = 0;

function loadQues() {
    const question = document.getElementById("ques");
    const opt = document.getElementById("opt");

    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = "";

    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;

        choiceLabel.textContent = Questions[currQuestion].a[i].text;

        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    }

    startTimer(20, () => {
        console.log("Time's up!");
        nextQuestion();
    });
}

loadQues();

function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        clearInterval(timer);
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        loadScore();
    }
}

function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);

    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct");
        nextQuestion();
    } else {
        nextQuestion();
    }
}

function loadScore() {
    const totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
}
