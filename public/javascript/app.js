document.addEventListener("DOMContentLoaded", function(){

console.log("hello");
var time;
var timer;
var countdownString = "TIME LEFT:   "
var pScoreString = "Player Score:  "
var playerScore = 0;
var q = 0;
var timeUp = false;

var startButton = document.getElementById("start");
var tButton = document.getElementById("tr");
var fbutton = document.getElementById("fl");
var qTitle = document.getElementById("qT");
var qMain = document.getElementById("qMain");
var Qnext = document.getElementById("nQ");
var pScore = document.getElementById("pScore");

welcome();

function welcome(){
     document.getElementById("triva").style.display = "none";
     startButton.addEventListener("click", start);
};
function start(){
     console.log('in start');
     startButton.style.display = "none";
     time = 11;
     timer = setInterval(mainTimer, 1000);
};

function mainTimer(){
     time -= 1;
     questionHolder(q);
     document.getElementById("triva").style.display = "block";
     document.getElementById("p1").innerHTML = countdownString + time;
     Qnext.style.display = "none";
     if(time <= 0){
        console.log("im here");
        timeUp = true;
        loser();
     }
};

function loser(){
     clearInterval(timer);
     console.log("u loose");
     if(timeUp === true){
     qMain.style.display = "none";
     qTitle.innerHTML = "<h1>Time Up!<h1>"; 
    } else {
     qMain.style.display = "none";
     qTitle.innerHTML = "<h1>Wrong Answer!<h1>";
    }
    showTF(false);
     Qnext.style.display = "inline";
     Qnext.addEventListener("click",nextQ);
};
function winner(){
     clearInterval(timer);
     
     console.log("win");
     playerScore+=10;
     showTF(false);
     pScore.innerHTML = `<b>${pScoreString}${playerScore}/100</b>`;
     console.log(`player score: ${playerScore}`);
     qMain.style.display = "none";
     qTitle.innerHTML = `<h1>Correct Answer<h1>`;
     
     Qnext.style.display = "inline";
     Qnext.addEventListener("click", nextQ);
}
function showTF(toggleTF){
     if(toggleTF === true){
     tButton.style.display = "inline";
     fbutton.style.display = "inline";
     } else {
      tButton.style.display = "none";
      fbutton.style.display = "none";  
    }
}
function nextQ(){
    console.log(`in the next q`);
    
    ++q;
    console.log(`Q: ${q}`);
    Qnext.style.display = "none";
    start();
}
function one(){
    console.log("this is the answer");
}
function t(){
    switch(q){
        case 0: 
        loser();
        break;
        case 1:
        winner();
        break;
        case 2:
        winner();
        break;
        case 3:
        loser();
        break;
        case 4:
        winner();
        break;
      
        
    }

}
function f(){
    switch(q){
        case 0: 
        winner();
        break;
        case 1:
        loser();
        break;
        case 2:
        loser();
        break;
        case 3:
        winner();
        break;
        case 4:
        loser();
        break;
     
        
    }

}

function questionHolder(q){
     switch (q) {
        case 0:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 1";
         qMain.innerText = `Kermit the frog said: "it's not easy being blue"`;
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 1:
        qTitle.style.display = "block";
        qMain.style.display = "block";
        qTitle.innerText = "Question 2";
        qMain.innerText = `"The Rainbow Connection" is the first song sung in the 1979 original Muppet Movie`;
        showTF(true);
        tButton.addEventListener("click",t, false);
        fbutton.addEventListener("click",f, false);
        break;
        case 2:
        qTitle.style.display = "block";
        qMain.style.display = "block";
        qTitle.innerText = "Question 3";
        qMain.innerText = `The "El Sleezo Cafe" is the name of the bar where Kermit meets Fozzie the Bear`;
        showTF(true);
        tButton.addEventListener("click",t, false);
        fbutton.addEventListener("click",f, false);
        break; 
        case 3:
        qTitle.style.display = "block";
        qMain.style.display = "block";
        qTitle.innerText = "Question 4";
        qMain.innerText = `Dr. Tooth and The Electric Mayhem is the name of the band Fozzie and Kermit encounter in a church`;
        showTF(true);
        tButton.addEventListener("click",t, false);
        fbutton.addEventListener("click",f, false);
        break;
        case 4:
        qTitle.style.display = "block";
        qMain.style.display = "block";
        qTitle.innerText = "Question 5";
        qMain.innerText = `Ms. Piggy is the name of the love interest for Kermit the Frog`;
        showTF(true);
        tButton.addEventListener("click",t, false);
        fbutton.addEventListener("click",f, false);
        break;   
    }
};











});