//Runs once at the beginning
function setup() {
  var googleSheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7mL4SikBYA1SozDnYjfSySyu3wKdq_CLeiUzNGal5KgizZYmrxouzQOQ7YPMNM1aVfDCao9gysMfi/pub?output=csv";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 
}

var correctSound = new Audio ("sounds/correctsound.mp3");
var wrongSound = new Audio ("sounds/wrongsound.mp3");

function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
  $("#question-count").html(`There are ${trivia.totalQuestions} questions waiting for you: are you ready to expand your knowledge?`);
}


function displayQuestion() {
  $(".screen").hide();
  $("#question-screen").show();
  trivia.insertQuestionInfo();
  trivia.shuffleAnswers();
  $("#correctAnswer").removeClass("highlight");
  $("#incorrectAnswer1, #incorrectAnswer2, #incorrectAnswer3").removeClass("highlightw");
  $("#feedback").hide();
}

function displayThankyou() {
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(`You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`);
}
function onClickedAnswer(isCorrect) {
  if (isCorrect) {
    $("#feedback").html(`You really know your stuff!`).show();
    correctSound.play(); 
    $("#feedback").append(`<br><button onclick="trivia.gotoNextQuestion();">Next Question</br>`);
    $("#correctAnswer").addClass("highlight"); //highlight right answer
    $("#incorrectAnswer1, #incorrectAnswer2, #incorrectAnswer3 ").addClass("highlightw"); //highlight wrong answer
  } else { 
    $("#feedback").html(`Wrong, better luck next time!`).show();
    wrongSound.play();
    $("#correctAnswer").addClass("highlight"); //highlight right answer
    $("#incorrectAnswer1, #incorrectAnswer2, #incorrectAnswer3 ").addClass("highlightw"); //highlight wrong answer
    $("#feedback").append(`<br><button onclick="trivia.gotoNextQuestion();">Next Question</br>`);
  }
}


function onClickedStart() {
    displayQuestion();
}

//Loops continously for background effects and animations. (p5.js)
function draw() {
  // Default to the gradient when not in a "correct" or "incorrect" state
  if (trivia.state == "welcome" || trivia.state == "question" || trivia.state == "thankyou") {
    document.body.style.background = "linear-gradient(to bottom, purple, white)";
  } else if (trivia.state == "correct") {
    document.body.style.background = "linear-gradient(to bottom, green, white)";  // Apply green background for "correct"
  } else if (trivia.state == "incorrect") {
    document.body.style.background = "linear-gradient(to bottom, red, white)";  // Apply red background for "incorrect"
  }
}