var timeEl = document.querySelector(".time"); //timer on the top right corner of the screen
var startBtn = document.querySelector(".startBtn"); //purple start quiz button
var introDiv = document.querySelector(".introduction") //div of the starting page and includes the 2 vars above.
var question1 = document.querySelector(".Q1"); //section of the first question
var question2 = document.querySelector(".Q2"); //section of the second question
var question3 = document.querySelector(".Q3"); //section of the third question
var question4 = document.querySelector(".Q4"); //section of the fourth question
var question5 = document.querySelector(".Q5"); //section of the finished on time screen
var question6 = document.querySelector(".Q6"); //section of the finished NOT on time screen
var highscores = document.querySelector(".Q7") // section of the highscores 
var highscoresButton = document.querySelector(".scores") // button on the top left corner for highscores
var initials1 = document.querySelector("#initials1") // initials input when the user finishes ontime 
var initials2 = document.querySelector("#initials2") // initials input when the user does not finish on time 
var button1 = document.querySelector("#button1") // submit button for initials1 input^^
var button2 = document.querySelector("#button2") // submit button for initials2 input^^
var options = document.querySelectorAll(".options"); //attribute of option for every multiple choice answer
var currentQuestion = 1; // this is to be used in the current question for loop
var timer; // this allows the timer set interval function to be used globally 
var count = 60; // this makes the count beging counting down from 60
var goToScores;
var homeBtn = document.querySelector(".homeBtn")


var score = 0; //Makes score equal to zero before starting a new quiz.

homeBtn.addEventListener("click", function(event){ // this is a home button when the user reaches the end of the quiz. 
    document.location.reload(event)
})

var scoresLog = JSON.parse(localStorage.getItem("scores"))||[] //JSON parses(objectifies) the scores inside localStorage and gets the data into the variable scoresLog.

button1.addEventListener("click", function(event){ // adding event listener to button 1 when clicked 
    event.preventDefault(); // prevents the refresh on the click of the button
    var initialsOne = initials1.value; // assigning input a variable to be stored in the objects
    console.log(initialsOne, score); //logging to see if the data is captured
    var input = { //object list of player and score
        player: initialsOne, //the value of the input 1 when they are on time 
        score:  score, // the value of the score when they answer the questions right
    }
    scoresLog.push(input); // adding the input objects into the scoresLog array
    localStorage.setItem("scores",JSON.stringify(scoresLog)); //turning the objects into strings. 
})

button2.addEventListener("click", function(event){ // Same code as button1 above^ START
    event.preventDefault();
    var initialsTwo = initials2.value;
    console.log(initialsTwo, score);
    var input2 = {
        player: initialsTwo,
        score: score,
    }
    scoresLog.push(input2);
    localStorage.setItem("scores", JSON.stringify(scoresLog)); // Same code as button1 above^ END
})                                                              


highscoresButton.addEventListener("click", function(event){  //adding event listener for highscores button
    if (event.target) { // if clicked, we hide all content except for the high scores content.
            timeEl.style.display = "none"
            highscores.style.display = "block";
            highscoresButton.style.display = "none"
            introDiv.style.display = "none";
            question1.style.display = "none";
            question2.style.display = "none";
            question3.style.display = "none";
            question4.style.display = "none";
            question5.style.display = "none";
            question6.style.display = "none";
    }
        
        for (var i=0; i<scoresLog.length;i++){ //for every item in the scoresLog array,
            var li = document.createElement("li"); //we create an li in the unordered list
            li.textContent = `Player: ${scoresLog[i].player} Score: ${scoresLog[i].score}`; //the li content will feature this way with player (showing the initials) and the score (showing the score)
            document.querySelector("#stats").append(li); // here we append the li into the (stats id in html for the Q7) section of the highscores.
        }
     
})


var startClick = startBtn.addEventListener("click", function (event) { //when start quiz button is clicked,
    if (event.target) { 
        introDiv.style.display = "none"; // we hide the intro section
    } if (event.target) {
        question1.style.display = "block"; // and we show the question section
    }
     timer = setInterval(function () { //when start quiz button is clicked the timer set interval function begins,
        if (count > 1) { // if count is greater than 1, 
            timeEl.textContent = (`${count} seconds left`); //we specify the seconds as plural
            count--;
        } else if (count === 1) { //when the count is equal to 1,
            timeEl.textContent = (`${count} second left`); //we specify the seconds as singular 
            count--;
        } else if (count === 0) { // when the count is equal to zero (the user did not finish on time),
            var timeUp = timeEl.innerHTML = "time is up!"; //we diaplay a message in the time element and assign this with a variable called timeUp.
            clearInterval(timer); // when the count is zero we also clear the timer interval
            if (timeUp) { // here, we say if timeUp then we display Q6 which is our finished not on time section while hiding all the other sections.
            question1.style.display = "none";
            question2.style.display = "none";
            question3.style.display = "none";
            question4.style.display = "none";
            question5.style.display = "none";
            question6.style.display = "block";
            }
        }
    }, 1000); //time interval will be in 1000 miliseconds  = seconds.
    
})


for (var i = 0; i < options.length; i++) { // for the options which is our answer choices, we looped through each one and,
    options[i].addEventListener("click", function (event) { // which ever answer is clicked,
        var userChoice = event.target.getAttribute("answer"); // the user choice is equal to the clicked answer 
        currentQuestion++ // we then make current question equal 2,
        if (currentQuestion === 1) { // this should not occur
            alert("question 1")
        } else if (currentQuestion === 2) { //when on question 2 we hide Q1 and display Q2
            question1.style.display = "none";
            question2.style.display = "block";
        } else if (currentQuestion === 3) {
            question2.style.display = "none"; //when on question 3 we hide Q2 and display Q3
            question3.style.display = "block";
        } else if (currentQuestion === 4) {
            question3.style.display = "none"; //when on question 4 we hide Q3 and display Q4
            question4.style.display = "block";
        } else if (currentQuestion === 5 && count>0) {
            question4.style.display = "none"; //when on question 5 we hide Q4 and display Q5. We also say if the user is on the last question and they still have time, we stop the timer.
            question5.style.display = "block"; 
            clearInterval(timer);
            var goToScores = document.createElement("p"); //creating a p tag to diplay a message
            goToScores.textContent = ` After submiting your initials, click on the "view highscores" button to view the score log. Keep in mind that new logs are placed on the bottom!`;
            goToScores.setAttribute("style", "font-size: 30px; color: purple")
            document.querySelector(".Q5").appendChild(goToScores) //appending the p tag
        } 

        // Here we say if the user chooses a wrong answer, and the time is below 15 seconds...
        if (userChoice === "wrong" && count <= 15) {
            question1.style.display = "none";
            question2.style.display = "none";
            question3.style.display = "none";
            question4.style.display = "none";
            question5.style.display = "none";
            question6.style.display = "block"; // we will show the section Q6 that they did not finish on time.
            timeEl.style.display = "none";
            count = count -15; 
        } else if (userChoice==="wrong"){ //if userchoise is wrong, and the timer is above 15 seconds we will deduct 15 seconds form the clock.
            count = count-15;
        } else { // otherwise, when they get the answer right, we will add a point to the score.
            score ++;
        }
    })
}



//THESE COMMENTS BELOW ARE NOTES FOR ME TO STUDY LATER, PLEASE DISREGARD! THANK YOU :)

// {/* <input class="initials" type="text"> 
//         <button class="submitBtn">Submit</button> */}







// function createQuestion(){

//     // <h3 class="question">Asking question here 4</h3>
//     // <div>
//     //     <ul>
//     //            <li>Answer Choice 1</li>
//     //            <li>Answer Choice 2</li>
//     //            <li>Answer Choice 3</li>
//     //            <li>Answer Choice 4</li>
//     //     </ul>
//     // </div>

//     var h3  = document.createElement("h3");
//     h3.innerHTML = "Asking question testing";

//     var div = document.createElement("div");
//     var ul = document.createElement("ul");

//     var li1 = document.createElement("li"); //can put all li tags in a loop instead of making 4
//     li1.innerHTML = "Answer Choice 1";

//     var li2 = document.createElement("li"); //can put all li tags in a loop instead of making 4
//     li2.innerHTML = "Answer Choice 2";

//     ul.append(li1);
//     ul.append(li2);

//     div.append(ul)

//     document.getElementById("test").append(h3);
//     document.getElementById("test").append(div);


// }


// createQuestion();
// createQuestion();
// createQuestion();