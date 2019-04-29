document.addEventListener("DOMContentLoaded", function(){

console.log("hello");
var time;
var timer;
var countdownString = "TIME LEFT:   "
var playerScore = 0;
var q = 0;

var startButton = document.getElementById("start");
var tButton = document.getElementById("tr");
var fbutton = document.getElementById("fl");
var qTitle = document.getElementById("qT");
var qMain = document.getElementById("qMain");
var Qnext = document.getElementById("nQ");
var toggleTF = true;
welcome();

function welcome(){
     document.getElementById("triva").style.display = "none";
     startButton.addEventListener("click", start);
};
function start(){
     startButton.style.display = "none";
     time = 10;
     timer = setInterval(stuff, 1000);
};

function stuff(){
     time -= 1;
     if(time <= 0){
        clearInterval(timer);
        loser();
     }
     document.getElementById("triva").style.display = "block";
     questionHolder(q);

     document.getElementById("p1").innerHTML = countdownString + time;
};

function loser(){
     clearInterval(timer);
     q++;
     console.log("u loose");
 
     qTitle.innerText= "Wrong Answer";
     qMain.innerHTML = "<h1>wrong answer!<h1>";
     showTF(false);
};
function winner(){
     q++;
     console.log("win");
     playerScore+=10;
     console.log(`player score: ${playerScore}`);
     qTitle.style.display = "none";
     qMain.style.display = "none";
     qTitle.style.innerHTML = "<h1>Correct Answer<h1>";
     showTF(false)
}
function showTF(toggleTF){
     if(toggleTF === true){
     tButton.style.display = "block";
     fbutton.style.display = "block";
     } else {
      tButton.style.display = "none";
      fbutton.style.display = "none";  
    }
}


 function questionHolder(q){
    switch (q) {
        case 0:
         qTitle.style.display = "block";
         qMain.style.display ="block";
         qTitle.innerText = "Question 1";
         qMain.innerText = "Kermit the frog said: 'it's not easy being blue'";
         tButton.addEventListener("click",loser);
         fbutton.addEventListener("click",winner);
        break;
        case 1:
          console.log("2");
        break;
        case 2:
          console.log("3");
        break;  
    }
};











});