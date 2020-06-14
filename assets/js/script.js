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

//create container element
var createContainerElement = function(){
    var containerEl = document.createElement("div");
    mainEl.appendChild(containerEl);
    containerEl.className="page-content";
    return containerEl;
}

//create button
var createButton = function(textButton, classString){
    var buttonEl = document.createElement("button");
    buttonEl.textContent = textButton;
    buttonEl.className = classString;

    return buttonEl;
}

//add dynamicly DIV with innerHTML to the container
var addDivContainer = function(containerEl, htmlText, classCSS){
    var divEl = document.createElement("div");
    divEl.innerHTML = htmlText;
    if (classCSS)
        divEl.className = classCSS;
    containerEl.appendChild(divEl);

    return divEl;
}

//get scores from Local Storage
var scoresLocalStorage = function(){
    var scores = localStorage.getItem("scoresQuiz");
    if (!scores)
        scores = [];
    else
        scores = JSON.parse(scores);

    return scores;
}

//Go Back button clicked
var goBack = function(){

}

//Clear high scores button clicked
var clearScores = function(){

}

// High score screen
var highScoresScreen = function(){
    var containerEl = createContainerElement();

    //High Scores div
    addDivContainer(containerEl, "<h2>High Scores</h2>", null );

    //list of scores
    var divListScores = addDivContainer(containerEl, "", null );
    var scores = scoresLocalStorage();
    ulEl = document.createElement("ul");
    ulEl.className="scoreList";
    for (i = 0; i < scores.length; i++){
        liEl = document.createElement("li");
        liEl.textContent = (i+1) + ". " + scores[i].initials + " - " + scores[i].score;
        ulEl.appendChild(liEl);
    }
    divListScores.appendChild(ulEl);

    //buttons
    //enter Initials div wrapper with flex elements
    var divEl = addDivContainer(containerEl, "", "flexWrapper");
    var divButton1 = addDivContainer(divEl, "", "padding10");
    var divButton2 = addDivContainer(divEl, "", "padding10");

    var btnGoBack = createButton("Go Back", "btn padding10");
    divButton1.appendChild(btnGoBack);
    btnGoBack.addEventListener("click", goBack);

    var btnClearScores = createButton("Clear High Scores", "btn padding10");
    divButton2.appendChild(btnClearScores);
    btnClearScores.addEventListener("click", clearScores);
}

//submit score - save to local storage
var submitScore = function(){
    var scores = scoresLocalStorage();

    var scoreObject = {
        initials: mainEl.querySelector("input").value,
        score: score
    }

    scores.push(scoreObject);

    localStorage.setItem("scoresQuiz", JSON.stringify(scores));

    //generate the next screen
    mainEl.querySelector(".page-content").remove();
    highScoresScreen();
    
}

//Save Score to local storage screen
var saveScoreScreen = function(){
    var containerEl = createContainerElement();

    //all done div
    addDivContainer(containerEl, "<h2><span id='allDone'>All done!</span></h2>", null );

    //your final score div
    addDivContainer(containerEl, "<span>" + "You final score is " + score + ".</span>", null );

    //enter Initials div wrapper with flex elements
    var divEl = addDivContainer(containerEl, "", "flexWrapper");
    addDivContainer(divEl, "<span>" + "EnterInitials: </span>", "padding10");
    var divInput = addDivContainer(divEl, "", "padding10");
    divInput.appendChild(document.createElement("input"));
    var divSubmit = addDivContainer(divEl, "", "padding10");

    //submit button
    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "Submit";
    submitButtonEl.className = "btn padding10";
    divSubmit.appendChild(submitButtonEl);
    submitButtonEl.addEventListener("click", submitScore);
}


// Create "answer" buttons for quiz question
var createButtonsQuiz = function(arQuestion){
    for (i =0; i < arQuestion.length; i++){
        var quizButtonEl = document.createElement("button");
        quizButtonEl.textContent = arQuestion[i];
        quizButtonEl.className = "btn";
        quizButtonEl.setAttribute("data-button-id", i);

        var buttonDivEl = document.createElement("div");
        buttonDivEl.className="padding10";
        buttonDivEl.appendChild(quizButtonEl);

        mainEl.querySelector(".page-content").appendChild(buttonDivEl);
    }
}


//create Questions - answers
var quizQuestions = function(){

    //create container div 
    var containerEl = createContainerElement();

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

    mainEl.querySelector(".page-content").remove();

    //ask next question
    if (questionNumber < quiz.length-1){
        questionNumber++;
        quizQuestions();
    }
    else
        saveScoreScreen();
}


//quiz answer button clicked
var quizButtonClick = function(event){
    var targetEl = event.target;

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

    setTimeout(nextStepQuiz, 1000);
}

quizQuestions();