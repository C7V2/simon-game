let gameseq=[];
let userseq=[];

let btns=["yellow","red","green","purple"];

var greenBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var scream = new Audio("game-over.mp3");
var cheer = new Audio("game-start.mp3");

function btnpress() {
    let btn = this;
    userflash(btn);
    usercol = btn.getAttribute("id");
    userseq.push(usercol);

    // Play sound based on the button pressed
    switch (usercol) {
        case 'red':
            redBoop.play();
            break;
        case 'green':
            greenBoop.play();
            break;
        case 'yellow':
            yellowBoop.play();
            break;
        case 'purple':
            blueBoop.play();
            break;
    }

    check(userseq.length - 1);
}



let started=false;
let level=0;

let val=0;
let h2=document.querySelector("h2");

h2.addEventListener("click",function(){
    //console.log("Game started")
    if(started==false){
        console.log("game is started");
        started=true;
        cheer.play();
        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },1000);
}

function userflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

// increase the level and flash one colour for the user and also level up the heading h2

function levelup(){

    userseq=[];
    level++;
    h2.innerText=`Score ${level}`;

    // flash random btn again and again make a function

    let ran=Math.floor(Math.random()*3);
    let rancol=btns[ran];
    switch (rancol) {
        case 'red':
            redBoop.play();
            break;
        case 'green':
            greenBoop.play();
            break;
        case 'yellow':
            yellowBoop.play();
            break;
        case 'purple':
            blueBoop.play();
            break;
    }
    let ranbtn=document.querySelector(`.${rancol}`);
    gameseq.push(rancol);
    console.log(gameseq);// for hint
    gameflash(ranbtn);

};

function check(ind){
    
    //console.log("current level=",level);
   // let ind=level-1;
    if(userseq[ind]==gameseq[ind]){
        if(userseq.length==gameseq.length)
        {
            setTimeout(levelup,1000);
        }
    }
    else{
        if(val<level){
            val=level;
        }
        scream.play();
        h2.innerHTML=`Game Over!<br> Your Score was <b>${level}</b><br>Highest Score =${val}<br>Tap me to start`
        // after game over start game gain by reset it
        document.querySelector("body").style.color="red";
        setTimeout(function(){
            document.querySelector("body").style.color="red";
        }, 200);
        reset();
    }
}

// function btnpress(){
//     let btn=this;
//     userflash(btn);

//     usercol=btn.getAttribute("id");
//     userseq.push(usercol);

//     check(userseq.length-1);
// }

function reset(){
    started=false;
    userseq=[];
    gameseq=[];
    level=0;
}
let allbtns=document.querySelectorAll(".btn");

for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}