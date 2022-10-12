var quizDirection = document.getElementById("quizDirection");
var startButton = document.getElementById("startButton");
var startPage = document.getElementById("startPage");

var questionPage = document.getElementById("questionPage");
var quizQuestion = document.getElementById("quizQuestion");

var choiceButton = document.getElementsByClassName("choiceButton");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

var rightWrong = document.getElementById("rightWrong");
var finalPage = document.getElementById("finalPage");
var finalScore = document.getElementById("finalScore");
var initials = document.getElementById("initials");

var submitButton = document.getElementById("submitButton");
var highScores = document.getElementById("highScores");
var viewhighScores = document.getElementById("viewhighScores");
var scoreList = document.getElementById("scoreList");
var allDone = document.getElementById("allDone");

var goBack = document.getElementById("goBack");
var clearButton = document.getElementById("clearButton");


// Question and answer array //
var questionArray = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["1. strings", "2. booleans", "3. numbers", "4. alerts"],
        answer: "4. alerts"
    }, {
        question: "The condition in an if / else statement is enclosed within ________.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    }, {
        question: "Arrays in JavaScript can be used to store ________.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    }, {
        question: "String values must be enclosed within ________ when being assigned to variables",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    }, {
        question: "A very useful tool used for developing and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },  {
        question: "How do you add a comment in a JavaScript?",
        choices: ["1. //This is a comment", "2. <!--This is a comment-->", "3. 'This is a comment", "4. * This is a comment *"],
        answer: "1. //This is a comment"
    },  {
        question: "How do you call a function named myFunction?",
        choices: ["1. call myFunction()", "2. call function myFunction()", "3. myFunction()", "4. call myFunction"],
        answer: "3. myFunctions()"
    },
]

var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;
var scoreResults;
var questionIndex = 0;

// Timer function //
var time = document.getElementById("time");

var totalTime = 60;
function countdown() {  
    var timerInterval = setInterval(function () {
      totalTime--;
      time.textContent = "Time: " + totalTime;
        if (totalTime <= 0){
            clearInterval(timerInterval);
            time.textContent = "Time is up!"; 
            allDone.textContent = "Time is up!";
            gameOver();
        } else  if(questionCount >= questionArray.length +1) {
            clearInterval(timerInterval);
            gameOver();
            } 
}, 1000);
}

// Start quiz fuction //
function startQuiz() {
    startPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    countdown();
    showQuestion(questionIndex);
}

function showQuestion() {
    quizQuestion.textContent = questionArray[questionIndex].question;
    choice1.textContent = questionArray[questionIndex].choices[0];
    choice2.textContent = questionArray[questionIndex].choices[1];
    choice3.textContent = questionArray[questionIndex].choices[2];
    choice4.textContent = questionArray[questionIndex].choices[3];
}

function checkAnswer(answer) {
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    rightWrong.style.display = "block";

    if (questionArray[questionIndex].answer === questionArray[questionIndex].choices[answer]) {
        totalScore++;
        rightWrong.textContent = "Correct!";
    } else {
        totalTime -= 10;
        time.textContent = totalTime;
        rightWrong.textContent = "Incorrect!"
    }

    questionIndex++;
    if (questionIndex < questionArray.length) {
        showQuestion();
    } else {
        gameOver();
    }
}

function choose1() { checkAnswer(0); }

function choose2() { checkAnswer(1); }

function choose3() { checkAnswer(2); }

function choose4() { checkAnswer(3); }


function gameOver() {
    questionPage.style.display = "none";
    finalPage.style.display = "block";
    console.log(finalPage);
    finalScore.textContent = "Your final score is: " + totalScore;
    time.style.display = "none";
}

function storeHighScores(event) {
    event.preventDefault();

    if (initials.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startPage.style.display = "none";
    time.style.display = "none";
    questionPage.style.display = "none";
    finalPage.style.display = "none";
    highScores.style.display = "block";   

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initials.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}

var i = 0;
function showHighScores() {

    startPage.style.display = "none";
    time.style.display = "none";
    questionPage.style.display = "none";
    finalPage.style.display = "none";
    highScores.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        scoreList.appendChild(eachNewHighScore);
    }
}

// Event listeners //

startButton.addEventListener("click", startQuiz);
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

submitButton.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewhighScores.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBack.addEventListener("click", function() {
    startPage.style.display = "block";
    highScores.style.display = "none";
});

clearButton.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    scoreList.innerHTML = "High Scores Cleared!";
});




























































