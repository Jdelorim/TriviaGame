document.addEventListener("DOMContentLoaded", function(){

console.log("hello");
var time;
var timer;
var clicker = false;
var jbutton =  document.getElementById("jbutton");
start();

function start(){
    jbutton.style.display = "none";
    clicker = false;
    console.log("clicker" + clicker);
//    console.log("start function");
    time = 10;
    timer = setInterval(stuff, 1000);
}

function stuff(){
    // console.log("stuff function");
    time -= 1;
    if(time <= 0){
        clearInterval(timer);
        loser();
    }
    document.getElementById("p1").innerHTML = time;
    // console.log("time"+ time);
   
};

function loser(){

   
    clicker = true;
    console.log("clicker " + clicker);
    if(clicker === true){
        jbutton.style.display = "block";
       jbutton.addEventListener("click", start);
       
    } 
    
};











});