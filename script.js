var timeEl = document.querySelector(".time");
var startBtn = document.querySelector(".startBtn")


var startClick = startBtn.addEventListener("click", function () {
    var count = 100;
    var timer = setInterval(function countDown() {
        timeEl.innerHTML = (`time: ${count}`);

        count --; 
        if (count ===0) {
            clearInterval(timer);
            timeEl.innerHTML = "time is up!"
        }
    },1000)
})

