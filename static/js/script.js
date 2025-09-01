// on generate being clicked
// load a random question from the json
// generate ranodm number from 0 to len of json - 1
// load in that question like section
// replace the question innerHTML with it
// replace the answer choices with the answers like A. and from the json which is separated by semicolons
// begin 60 second timer

var json_data = null
var question_ind = null

function loadBank() {
    fetch('static/json/questionbank.json')
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        json_data = data;
        console.log(json_data)
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
  });
}

loadBank()


function genQuestion() {

    if (!(document.getElementById("disable").checked)) {
        timer()
    }

    const answerBtns = document.getElementsByClassName("anschoice")
    for (a of answerBtns) {
        a.children[0].disabled = false
    }

    let qLen = json_data.length;
    question_ind = Math.floor(Math.random() * qLen);

    let question = json_data[question_ind]
    console.log(question)

    const questionText = document.getElementById("questiontext")
    questionText.innerHTML = "Question: " + question["Question"]

    let choices = question["Options"].split("; ")
    console.log(choices)

    for (let i = 0; i < choices.length; i++) {
        answerBtns[i].children[1].innerHTML = choices[i]
        answerBtns[i].children[0].checked = false
    }

    const questionImg = document.getElementById("qimg")
    questionImg.setAttribute("src", question["Image"])
}


// on click submit button
// check if the answer is correct using the json's correct answer
// if theres no answer assume incorrect
// show correct answer regardless of accuracy
// pause timer

function checkAns() {
    stopTimer()

    const answerBtns = document.getElementsByClassName("anschoice")
    let givenAns = null

    for (let i = 0; i < 4; i++) {
        if (answerBtns[i].children[0].checked) {
            givenAns = answerBtns[i].children[0].id
        }

    }

    if (givenAns == json_data[question_ind]["Answer"]) {
        correct()
    } else {
        incorrect()
    }

    for (a of answerBtns) {
        a.children[0].disabled = true
    }
}


function correct() {
    console.log("correct!")
    const ansBox = document.getElementById("answerbox")
    ansBox.innerHTML = "Correct! The answer was " + json_data[question_ind]["Answer"] + "."
    const nextBtn = document.getElementById("nextbtn")
    nextBtn.style = "display: block"
}


function incorrect() {
    console.log("incorrect")
    const ansBox = document.getElementById("answerbox")
    ansBox.innerHTML = "Incorrect. The answer was " + json_data[question_ind]["Answer"] + "."
    const nextBtn = document.getElementById("nextbtn")
    nextBtn.style = "display: block"
}


var timerint = null

function timer(){
    if (timerint) {
        clearInterval(timerint);
    }
    var sec = 60;
    timerint = setInterval(function(){
        document.getElementById('timer').innerHTML= ' Timer: 00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timerint);
            timerint = null
        }
    }, 1000);
}

function stopTimer() {
    if (timerint) {
        clearInterval(timerint);
        timerint = null;
    }
}
