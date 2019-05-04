"use strict";

document.addEventListener("DOMContentLoaded", function(){

let time = 0;
let timer;
const countdownString = "TIME LEFT:  ";
const pScoreString = "Player Score:  ";
let playerScore = 0;
let q = 0;
let timeUp = false;
const startButton = document.getElementById("start");
const tButton = document.getElementById("tr");
const fbutton = document.getElementById("fl");
const qTitle = document.getElementById("qT");
const qMain = document.getElementById("qMain");
const Qnext = document.getElementById("nQ");
const pScore = document.getElementById("pScore");
const pName = document.getElementById('pName');
const pHScore = document.getElementById('pHighScore');
let lastQ = false;
let refresh = false;
let lastScore = 0;
let uname;

$('#userNameBtn').on('click',  ()=>{
    uname = $('#uName').val();
    
    $.ajax({
        method: "POST",
        url: "/usersdb",
        data: {
            username: uname,
            highscore: playerScore
        }
    }).then(()=>{
        $.get('/api/usersdb', (data)=>{
            console.log('data: ', data);
            if(data === true){
               alert('Username already taken please choose another!')
            } else {
                pName.innerHTML = `<h2><b>Welcome: ${uname}!</b></h2>`;
                document.getElementById('userInput').style.display = 'none';
               welcome();
            }
        })
    })
})


const setup=()=>{
    startButton.style.display = 'none';
    document.getElementById("triva").style.display = "none";
}

setup();

const welcome=()=>{
     startButton.style.display = 'block';
     startButton.addEventListener("click", start);
}

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
}
const mainTimer=()=>{
     time -= 1;
     questionHolder(q);
     document.getElementById("triva").style.display = "block";
     document.getElementById("p1").innerHTML = countdownString + time;
     Qnext.style.display = "none";
     if(time <= 0){
        timeUp = true;
        loser();
     }
}
const loser=()=>{
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
const winner=()=>{
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
}
const showTF=(toggleTF)=>{
     if(toggleTF === true){
     tButton.style.display = "inline";
     fbutton.style.display = "inline";
     } else {
      tButton.style.display = "none";
      fbutton.style.display = "none";  
    }
}
const nextQ=()=>{
    ++q;
    console.log(`Q: ${q}`);
    Qnext.style.display = "none";
    start();
}
const finalScore=()=>{
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
    
if(playerScore >= lastScore){
    $.ajax({
        method: "POST",
        url: "/updateScore",
        data: {
            highscore: playerScore
        }
    }).then(function(){
        lastScore = playerScore;
        pHScore.innerHTML = `<h3><b>Your High Score is: ${lastScore}</b></h3>`;
    })
    .catch(function(err){
        console.log(err);
    })
}else {
    console.log(`didn't beat score`);
}
}

const t=()=>{
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
}

const f=()=>{
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
}

const questionHolder=(q)=>{
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
}

})