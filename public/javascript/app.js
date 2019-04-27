document.addEventListener("DOMContentLoaded", function(){

console.log("hello");
var time;
var timer;
var countdownString = "TIME LEFT   "

var q = 0;
// var jbutton =  document.getElementById("jbutton");
var startButton = document.getElementById("start");
var tButton = document.getElementById("tr");
var fbutton = document.getElementById("fl");
var qTitle = document.getElementById("qT");
var qMain = document.getElementById("qMain");

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
    q++;
   console.log("u loose");
   //hide buttons and show losing screen
};
function winner(){
    q++;
    console.log("u win");
    //hide buttons and show winner screen
    //add score
}

function questionHolder(q){
    switch (q) {
        case 0:
         qTitle.style.display = "block";
         qMain.style.display ="block";
         qTitle.innerText = "Question 1";
         qMain.innerText = "Kermit the frog said it's not easy being blue";
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