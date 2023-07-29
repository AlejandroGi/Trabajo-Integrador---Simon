/*--------------------------------------------------------------
# boxName
--------------------------------------------------------------*/
/*
var userName= document.getElementById('userName');
userName.addEventListener('keyup',changeTitle);
userName.addEventListener('keyup',validateUser);

var nameTitle= document.getElementById('titleUser');

var btnReady= document.getElementById('btnReady');
btnReady.addEventListener('click',newGame);

var boxName= document.getElementById('boxName');
var body= document.getElementById('body');
var alingBox= document.getElementById('alingBox');
var info= document.getElementById('info');

var flagReady= false;

var status= document.getElementById('status').innerText;


function newGame(){ 
    document.getElementById('inputsForm').display="none";
    document.getElementById('boxName').display= "none";
    
}

function changeTitle(){
    nameTitle.innerText = 'WELCOME ' + userName.value;
    if(userName.value.length == 0){
        nameTitle.innerText = 'WELCOME USER';
    }
}

function validateUser(){
    if (userName.value.length > 3){
        btnReady.style.backgroundColor="var(--color-primary)";
        btnReady.style.boxShadow="0px 0px 10px 2px var(--color-primary-light)";
        btnReady.style.color="var(--color-white)";

        flagReady=true;
    }else{
        btnReady.style.backgroundColor="";
        btnReady.style.boxShadow="";
        btnReady.style.color="";

        flagReady=false;
    }
}
*/

var statusGame;
var secGame= [];
var secHuman= [];
var level= 1;
var points= 0;
var reason;
var timerIteration= 5000;
var timeRemainGame = 5;
var position= 0;
var timer;

var btnGame= document.getElementById('btnGame');
btnGame.addEventListener('click',gameRound);

var btnYellowID= document.getElementById('btnYellow');
btnYellowID.addEventListener('click',sequenceHuman);

var btnRedID= document.getElementById('btnRed');
btnRedID.addEventListener('click',sequenceHuman);

var btnBlueID= document.getElementById('btnBlue');
btnBlueID.addEventListener('click',sequenceHuman);

var btnGreenID= document.getElementById('btnGreen');
btnGreenID.addEventListener('click',sequenceHuman);



/*----------------Prendo y apago el brillo de los colores----------------*/
function colorBtnSecGlow(number){
    /*debugger;*/
    console.log('Entro a "colorBtnSecGlow"');
    switch(number){
        case 0:
            btnYellowID.style.boxShadow = '0px 0px 30px 10px yellow';
            setTimeout(function(){
                btnYellowID.style.boxShadow = ''; /*Si no le aclaro propiedades retoma el valor orignal del style*/
            }, 500)
        break;

        case 1:
            btnRedID.style.boxShadow = '0px 0px 30px 10px red';
            setTimeout(function(){
                btnRedID.style.boxShadow = '';
            }, 500)
        break;

        case 2:
            btnBlueID.style.boxShadow = '0px 0px 30px 10px blue';
            setTimeout(function(){
                btnBlueID.style.boxShadow = '';
            }, 500)
        break;

        case 3:
            btnGreenID.style.boxShadow = '0px 0px 30px 10px green';
            setTimeout(function(){
                btnGreenID.style.boxShadow = '';
            }, 500)
        break;
        default: console.log("colorBtnSecGlow - Salida por default");
    }
}





function updateRound(){
    timeRemainGame= 5 + level*2 ;
    timerIteration= timeRemainGame*1000 + 1000;
    position= 0;
    secHuman.length= 0;
    console.log("secHuman" + secHuman.length);
    document.getElementById('lvl').innerText = ++level;
    document.getElementById('points').innerText= ++points;
    
    console.log("/---------------updateRound-------------/");
    console.log("reset secHuman: " + secHuman.length);
    console.log("reset position: " + position);

    resetCountdown(timer);
}

function checkSequences(){
    console.log("checkSequences");
    console.log("cadena a repetir: " + secGame);
    console.log("cadena ingresada: " + secHuman);

    if (secGame.length == secHuman.length){
        return true;
    }else{
        return false;
    }
}

function checkGame(){
    if (checkSequences()){
        console.log("/----------checkGame - TRUE -----------/");
        clearInterval(timer); /*Corto el countDown*/
        updateRound();
        playGame();
        
    }else{
        console.log("/----------checkGame - FALSE -----------/");
        console.log("Largo del juego " + secGame.length);
        console.log("Posicion:"+ position);
    }
   
}

function checkSequencesClick(){
    if (checkStatus() == 'Playing'){
        if (secGame[position] != secHuman[position]){
            console.log("/-----------------checkStatus TRUE----------/");
            console.log("posicion: " + position);
            console.log("checkSequencesClick -- secGameCadena:" + secGame);
            console.log("checkSequencesClick -- secHumanCadena:" + secHuman);
            console.log("checkSequencesClick -- secGame:" + secGame[position]);
            console.log("checkSequencesClick -- secHuman:" + secHuman[position]);
           
            reason= "Error en la secuencia!";
            gameOver(reason);
        }else{
            clearInterval(timer); /*Queda trabado en count. Saldra con esto?*/
            console.log("/-----------------checkStatus FALSE----------/");
            console.log("posicion: " + position);
            console.log("checkSequencesClick -- secGameCadena:" + secGame);
            console.log("checkSequencesClick -- secHumanCadena:" + secHuman);
            console.log("checkSequencesClick -- secGame:" + secGame[position]);
            console.log("checkSequencesClick -- secHuman:" + secHuman[position]);
            checkGame();

        }

        var flagUse0;

        if (position < 1){
            flagUse0=false;
        }else{
            flagUse0=true; /*Desp del update*/
        }

        if (position == 0 && flagUse0){
            console.log("checkSequencesClick - position: " + position);
            position++;
            console.log("checkSequencesClick - position: " + position);
        }
    }
}

function sequenceHuman(){
    if (checkStatus() == 'Playing'){
        switch(this.id){
            case 'btnYellow':
                secHuman.push(0);
                checkSequencesClick();
                console.log("se agrego el numero 0 a los presionados.");
            break;
            case 'btnRed':
                secHuman.push(1);
                checkSequencesClick();
                console.log("se agrego el numero 1 a los presionados.");
            break;
            case 'btnBlue':
                secHuman.push(2);
                checkSequencesClick();
                console.log("se agrego el numero 2 a los presionados.");
            break;
            case 'btnGreen':
                secHuman.push(3);
                checkSequencesClick();
                console.log("se agrego el numero 3 a los presionados.");
            break;
        }
    }
}


function resetCountdown(){
    clearInterval(timer);
    timeRemainGame=5;
    document.getElementById('timerNumber').innerText = "-";
}

function gameOver(reason){
    document.getElementById('status').innerText = reason;
    
    btnGame.style.backgroundColor = '#be04ec';

    secGame.length= 0;
    secHuman.length= 0;
    level=1;
    timerIteration= 5000;
    timeRemainGame= 5;
    points= 0;
    position= 0;
    console.log(reason);

    resetCountdown();
}






/*----------------Contador del timer----------------*/
function countDown(){
    timer = setInterval(function() {
        document.getElementById('timerNumber').innerText = timeRemainGame;
        timeRemainGame--;

        if (timeRemainGame == 0 || checkStatus == "Ready" || checkStatus == "Error en la secuencia!") {
          reason="Times up";
          clearInterval(timer);
          gameOver(reason);
        }
    }, 1000);
}



function checkStatus(){
    return document.getElementById('status').innerText;
} 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function addSequenceColor(){
    var random = getRandomInt(0,3);
    console.log("/---------------addSequenceColor----------");
    console.log("Se agrego a la secuencia de numeros a repetir el numero: "+ random);
    
    secGame.push(random);
    colorBtnSecGlow(random);
}

function sequenceColor(){
    var roundGame= 0;
    var interval= setInterval(function(){
        if (roundGame <=secGame.length-1){
            colorBtnSecGlow(secGame[roundGame]);
            console.log("/------------sequenceColor--------------");
            console.log("Brilla color" + secGame[roundGame]);
            roundGame++;
        }else{
            addSequenceColor(); 
            clearInterval(interval);   
        }
    }, 800)
}


function playGame(){
    console.log("1. -------------------------------------");
    sequenceColor();
    countDown();
}

function starGame(){
    document.getElementById('status').innerText = "Playing";
    document.getElementById('lvl').innerText = level;

    btnGame.style.backgroundColor = '#ec0436';
}

function resetGame(){
    
    document.getElementById('status').innerText = "Ready";
    document.getElementById('lvl').innerText = "-";
    document.getElementById('points').innerText = "-";
    
    btnGame.style.backgroundColor = '#be04ec';

    secGame.length= 0;
    secHuman.length= 0;
    level=1;
    timerIteration= 5000;
    timeRemainGame = 5;
    points= 0;
    position= 0;

    resetCountdown();
}

function gameRound(){
    if (checkStatus() == 'Playing'){
        resetGame();
    }else{
        starGame();
        playGame();
    }
}