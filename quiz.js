//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
 const questions = [
    {
        question: "welke kleur is insectenbloed?",
        optionA: "lichtgeel",
        optionB: "rood",
        optionC: "lichtblauw",
        optionD: "donker wit",
        correctOption: "optionA"
    },

    {
        question: "hoe is het bloed van insecten lichtgeel?",
        optionA: "gele bloedvaten",
        optionB: "geen witte bloedcellen",
        optionC: "geen rode bloedcellen",
        optionD: "geen hemoglobine in bloed",
        correctOption: "optionD"
    },

    {
        question: "hoelang zijn de darmen van een potvis?",
        optionA: "10m",
        optionB: "600m",
        optionC: "40m",
        optionD: "500m",
        correctOption: "optionB"
    },

    {
        question: "waarom heeft de hengelvis een lamp?",
        optionA: "omdat het donker is onder water",
        optionB: "voor decoratie",
        optionC: "om prooi te lokken",
        optionD: "hij kan niet goed zien",
        correctOption: "optionC"
    },

    {
        question: "welke tanden ontbreken bij planteneters?",
        optionA: "voortanden",
        optionB: "knobbelkiezen",
        optionC: "ze hebben geen tanden",
        optionD: "hoektanden",
        correctOption: "optionD"
    },

    {
        question: "waardoor is een kat slanker dan een koe?",
        optionA: "de kat beweegt meer",
        optionB: "korter verteringsstelsel",
        optionC: "toevallig",
        optionD: "een koe eet meer",
        correctOption: "optionB"
    },

    {
        question: "wat voor soort is een koe?",
        optionA: "planteneter",
        optionB: "diereneter",
        optionC: "alleseter",
        optionD: "graseter",
        correctOption: "optionA"
    },

    {
        question: "welke overlevingsstrategie heeft de melkslang?",
        optionA: "camouflage",
        optionB: "mimicry",
        optionC: "dieren aanvallen",
        optionD: "ondergronds blijven",
        correctOption: "optionB"
    },

    {
        question: "waar zitten de ademhalingsorganen van de wesp",
        optionA: "in zijn hoofd",
        optionB: "in zijn stinger",
        optionC: "door zijn hele lichaan",
        optionD: "in zijn poten",
        correctOption: "optionC"
    },

    {
        question: "wanneer is je lichaamstemperatuur het hoogst",
        optionA: "in de ochtend",
        optionB: "in de middag",
        optionC: "in de avond",
        optionD: "in de nacht",
        correctOption: "optionB"
    },

    {
        question: "wanneer is je lichaamstemperatuur het laagst",
        optionA: "in de ochtend",
        optionB: "in de middag",
        optionC: "in de avond",
        optionD: "in de nacht",
        correctOption: "optionD"
    }
];


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0 
let wrongAttempt = 0
let indexNumber = 0 

// Functie om de volgende vraag in de array te tonen
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //pakt huidige vraag
    const currentQuestionAnswer = currentQuestion.correctOption //pakt huidige antwoord
    const options = document.getElementsByName("option"); //pakt alle opties
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Blijf oefenen."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 8) {
        remark = "Ok score, je kan beter."
        remarkColor = "orange"
    }
    else if (playerScore >= 8) {
        remark = "Goed gedaan!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}