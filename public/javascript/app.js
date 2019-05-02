"use strict";

document.addEventListener("DOMContentLoaded", function(){


var time;
var timer;
var countdownString = "TIME LEFT:  ";
var pScoreString = "Player Score:  ";
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
var pName = document.getElementById('pName');
var pHScore = document.getElementById('pHighScore');
var lastQ = false;
var refresh = false;
var lastScore = 0;
var uname;

$('#userNameBtn').on('click', function (){
        console.log('its working');
        uname = $('#uName').val();
        $.ajax({
            method: "POST",
            url: "/usersdb",
            data: {
                username: uname,
                highscore: playerScore
            }
        }).then(function(data){
            console.log('name: ', data.username);
        })
        .catch(function(err){
            console.log(err);
        })
});
// $.get('/api/usersdb', function(data){
//     console.log('data: ', data);
// })
welcome();

function welcome(){
     document.getElementById("triva").style.display = "none";
     startButton.addEventListener("click", start);
};

function start(){
    console.log('lastScore  ' ,lastScore);
     console.log('in start');
     if(refresh === true){
         console.log("in refresh");
         Qnext.innerText = "Next Question";
         Qnext.style.display = "none";
         Qnext.removeEventListener("click", start);
         Qnext.addEventListener("click", nextQ);
         q = 0;
         playerScore = 0;
         pScore.innerHTML = `<b>${pScoreString}${playerScore}/100</b>`
         showTF(true);
         lastQ = false;
         refresh = false;
    }
     pName.innerHTML = `<b>${uname}<b>`
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
     timeUp = false; 
    } else {
     qMain.style.display = "none";
     qTitle.innerHTML = "<h1>Wrong Answer!<h1>";
     timeUp = false;
    }
    showTF(false);
    Qnext.style.display = "inline";
    if(lastQ === false){
    Qnext.addEventListener("click", nextQ);
    } else {
    Qnext.innerText = "See Final Score";
    Qnext.removeEventListener("click", nextQ);
    Qnext.addEventListener("click", finalScore);  
    }
};
function winner(){
     clearInterval(timer);
     timeUp = false;
     playerScore+=10;
     showTF(false);
     pScore.innerHTML = `<b>${pScoreString}${playerScore}/100</b>`;
     console.log(`player score: ${playerScore}`);
     qMain.style.display = "none";
     qTitle.innerHTML = `<h1>Correct Answer<h1>`;
     Qnext.style.display = "inline";
     
     if(lastQ === false){
        Qnext.addEventListener("click", nextQ);
     } else {
       Qnext.innerText = "See Final Score";
       Qnext.removeEventListener("click", nextQ);
       Qnext.addEventListener("click", finalScore);  
     }
};
function showTF(toggleTF){
     if(toggleTF === true){
     tButton.style.display = "inline";
     fbutton.style.display = "inline";
     } else {
      tButton.style.display = "none";
      fbutton.style.display = "none";  
    }
};
function nextQ(){
    ++q;
    console.log(`Q: ${q}`);
    Qnext.style.display = "none";
    start();
};
function finalScore(){
    console.log("final score");
    showTF(false);
    refresh = true;
    Qnext.innerText = "Play again!";
    Qnext.removeEventListener("click", finalScore);
    Qnext.addEventListener("click", start);
    if(playerScore === 100){
        qTitle.innerHTML = `<h1>Perfect Score!<h1>`; 
    } else if(playerScore >= 90){
        qTitle.innerHTML = `<h1>You only Missed One Good Job!<h1>`;
    }else if(playerScore >= 80){
        qTitle.innerHTML = `<h1>You have average knowledge of The Muppets!<h1>`;
    }else if(playerScore >= 70){
        qTitle.innerHTML = `<h1>Well you could have done worse!<h1>`;
    } else {
        qTitle.innerHTML = `<h1>You really should try again!<h1>`;
    }
    ///
    if(playerScore >= lastScore){
    $.ajax({
        method: "POST",
        url: "/updateScore",
        data: {
            
            highscore: playerScore
        }
    }).then(function(){
        lastScore = playerScore;
    })
    .catch(function(err){
        console.log(err);
    })
}else {
    console.log(`didn't beat score`);
}
};

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
        case 5:
        loser();
        break;
        case 6:
        winner();
        break;
        case 7:
        winner();
        break;
        case 8:
        loser();
        break;
        case 9:
        winner();
        break;
    }
};

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
        case 5:
        winner();
        break;
        case 6:
        loser();
        break;
        case 7:
        loser();
        break;
        case 8:
        winner();
        break;
        case 9:
        loser();
        break;
     }
};

function questionHolder(q){
     switch (q) {
        case 0:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 1";
         qMain.innerText = `Kermit the frog said: "it's not easy being blue".`;
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 1:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 2";
         qMain.innerText = `"The Rainbow Connection" is the first song sung in the 1979 original Muppet Movie.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 2:
        qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 3";
         qMain.innerText = `The "El Sleezo Cafe" is the name of the bar where Kermit meets Fozzie the Bear.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break; 
        case 3:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 4";
         qMain.innerText = `Dr. Tooth and The Electric Mayhem is the name of the band Fozzie and Kermit encounter in a church.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 4:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 5";
         qMain.innerText = `Ms. Piggy is the name of the love interest for Kermit the Frog.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break; 
        case 5:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 6";
         qMain.innerText = `Rowlf the Dog plays the Saxophone.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 6:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 7";
         qMain.innerText = `Hare Krishna is referenced more than once in the film.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 7:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 8";
         qMain.innerText = `Dr. Bunsen Honeydew's assist is named Beaker.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break; 
        case 8:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 9";
         qMain.innerText = `Gonzo sings the song "I'm going to go back there tomorrow" after there vechile breaks down.`;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false);
        break;
        case 9:
         qTitle.style.display = "block";
         qMain.style.display = "block";
         qTitle.innerText = "Question 10";
         qMain.innerText = `Statler and Waldorf are the two hecklers in The Muppet Movie.`;
         lastQ = true;
         showTF(true);
         tButton.addEventListener("click",t, false);
         fbutton.addEventListener("click",f, false); 
         break; 
    }
};

});