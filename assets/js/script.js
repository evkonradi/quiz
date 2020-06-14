var quiz= [
    {
        q: "Question1", a: ["answer1-1", "answer1-2", "answer1-3", "answer1-4"], aCorrect: 2
    },
    {
        q: "Question2", a: ["answer2-1", "answer2-2", "answer2-3", "answer2-4"], aCorrect: 1
    },
    {
        q: "Question3", a: ["answer3-1", "answer3-2", "answer3-3", "answer3-4"], aCorrect: 3
    },
    {
        q: "Question4", a: ["answer4-1", "answer4-2", "answer4-3", "answer4-4"], aCorrect: 4
    },
    {
        q: "Question5", a: ["answer5-1", "answer5-2", "answer5-3", "answer5-4"], aCorrect: 4
    }
]
var mainEl = document.querySelector("#mainSection");
var questionNumber = 0;
var score = 0;


// Create "answer" buttons for quiz question
var createButtonsQuiz = function(arQuestion){
    for (i =0; i < arQuestion.length; i++){
        var quizButtonEl = document.createElement("button");
        quizButtonEl.textContent = arQuestion[i];
        quizButtonEl.className = "btn";
        quizButtonEl.setAttribute("data-button-id", i);

        var buttonDivEl = document.createElement("div");
        buttonDivEl.className="paddingButton";
        buttonDivEl.appendChild(quizButtonEl);

        mainEl.querySelector(".page-content").appendChild(buttonDivEl);
    }
}


//create Questions - answers
var quizQuestions = function(){

    //create container div 
    var containerEl = document.createElement("div");
    mainEl.appendChild(containerEl);
    containerEl.className="page-content";

    //question
    var questionDivEl = document.createElement("div");
    questionDivEl.innerHTML = "<h2>" + quiz[questionNumber].q + "</h2>";
    containerEl.appendChild(questionDivEl);

    //buttons
    createButtonsQuiz(quiz[questionNumber].a);

    //correct or incorrect message
    var correctOrWrongEl = document.createElement("div");
    correctOrWrongEl.className="answerResult";
    correctOrWrongEl.innerHTML = "<span></span>";
    containerEl.appendChild(correctOrWrongEl);

    containerEl.addEventListener("click", quizButtonClick);

}


//move to the next step after a question is answered
var nextStepQuiz = function(){

    //ask next question
    if (questionNumber < quiz.length-1){
        questionNumber++;
        mainEl.querySelector(".page-content").remove();
        quizQuestions();
    }
}


//quiz answer button clicked
var quizButtonClick = function(event){
    var targetEl = event.target;
    console.log(targetEl);

    if (targetEl.matches(".btn")){
        var buttonId = targetEl.getAttribute("data-button-id");
        var correctOrWrongEl = mainEl.querySelector(".page-content .answerResult span");
        if (buttonId == quiz[questionNumber].aCorrect)
        {
            score++;
            correctOrWrongEl.textContent = "Correct!"
        }
        else{
            correctOrWrongEl.textContent = "Wrong!"
        }
    }

    setTimeout(nextStepQuiz, 1500);
}

quizQuestions();