var timeEl = document.querySelector(".time");
var startBtn = document.querySelector(".startBtn");
var introDiv = document.querySelector(".introduction")
var question1 = document.querySelector(".Q1");
var question2 = document.querySelector(".Q2");
var question3 = document.querySelector(".Q3");
var question4 = document.querySelector(".Q4");
var question5 = document.querySelector(".Q5");
var question6 = document.querySelector(".Q6");
var options = document.querySelectorAll(".options");
var currentQuestion = 1;
var timeLeft = count;
var timer;
var count = 60;
var highscores = document.querySelector(".Q7")
var highscoresAnchor = document.querySelector(".scores")
var initials1 = document.querySelector("#initials1")
var initials2 = document.querySelector("#initials2")
var button1 = document.querySelector("#button1")
var button2 = document.querySelector("#button2")


var score = 0;

var scoresLog = JSON.parse(localStorage.getItem("scores"))||[] 

button1.addEventListener("click", function(event){
    event.preventDefault();
    var initialsOne = initials1.value;
    console.log(initialsOne, score);
    var input = {
        player: initialsOne,
        score:  score,
    }
    scoresLog.push(input);
    localStorage.setItem("scores",JSON.stringify(scoresLog));
})




highscoresAnchor.addEventListener("click", function(event){
    if (event.target) {
            timeEl.style.display = "none"
            highscores.style.display = "block";
            introDiv.style.display = "none";
            question1.style.display = "none";
            question2.style.display = "none";
            question3.style.display = "none";
            question4.style.display = "none";
            question5.style.display = "none";
            question6.style.display = "none";
    }
        
        for (var i=0; i<scoresLog.length;i++){
            var li = document.createElement("li");
            li.textContent = `Player: ${scoresLog[i].player} Score: ${scoresLog[i].score}`;
            document.querySelector("#stats").append(li);
        }
     
})


var startClick = startBtn.addEventListener("click", function (event) {
    if (event.target) {
        introDiv.style.display = "none";
    } if (event.target) {
        question1.style.display = "block";
    }
     timer = setInterval(function () {
        // timeEl.textContent = (`${count} seco`);
        // count--;
        if (count > 1) {
            timeEl.textContent = (`${count} seconds left`);
            count--;
        } else if (count === 1) {
            timeEl.textContent = (`${count} second left`);
            count--;
        } else if (count === 0) {
            var timeUp = timeEl.innerHTML = "time is up!";
            clearInterval(timer);
            if (timeUp) {
            question1.style.display = "none";
            question2.style.display = "none";
            question3.style.display = "none";
            question4.style.display = "none";
            question5.style.display = "none";
            question6.style.display = "block";
            }
        }
    }, 1000);
    
})


for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function (event) {
        var userChoice = event.target.getAttribute("answer");
 
        currentQuestion++

        if (currentQuestion === 1) {
            alert("question 1")
        } else if (currentQuestion === 2) {
            question1.style.display = "none";
            question2.style.display = "block";
        } else if (currentQuestion === 3) {
            question2.style.display = "none";
            question3.style.display = "block";
        } else if (currentQuestion === 4) {
            question3.style.display = "none";
            question4.style.display = "block";
        } else if (currentQuestion === 5 && count>0) {
            question4.style.display = "none";
            question5.style.display = "block";
            clearInterval(timer);
        } 

        
        if (userChoice === "wrong" && count <= 15) {
            question1.style.display = "none";
            question2.style.display = "none";
            question3.style.display = "none";
            question4.style.display = "none";
            question5.style.display = "none";
            question6.style.display = "block";
            timeEl.style.display = "none";
            count = count -15;
        } else if (userChoice==="wrong"){
            count = count-15;
        } else {
            score ++;
        }
    })
}

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