var statusGame;
var secGame = [];

var level = 0;


var btnYellowID= document.getElementById('btnYellow');

btnYellowID.addEventListener('click',funcColorAmarillo);
function funcColorAmarillo(){
    console.log('amarillo');
}

var btnRedID= document.getElementById('btnRed');
btnRedID.addEventListener('click',funcColorRojo);
function funcColorRojo(){
    console.log('rojo');
}
var btnBlueID= document.getElementById('btnBlue');
btnBlueID.addEventListener('click',funcColorAzul);
function funcColorAzul(){
    console.log('azul');
}
var btnGreenID= document.getElementById('btnGreen');
btnGreenID.addEventListener('click',funcColorVerde);
function funcColorVerde(){
    console.log('Verde');
}



/*----------------------------BTN GAME-----------------------------*/
var btnGame = document.getElementById('btnGame');
btnGame.addEventListener('click',gameRound);


function colorBtnSecGlow(number){
    console.log('colors');
    switch(number){
        case 0:
            btnYellowID.style.boxShadow = '0px 0px 30px 10px yellow';
        setTimeout(function(){
            btnYellowID.style.boxShadow = ''; /*Si no le aclaro propiedades retoma el valor orignal del style*/
        }, 250)
        console.log('caso 0');
        break;

        case 1:
            btnRedID.style.boxShadow = '0px 0px 30px 10px red';
            setTimeout(function(){
                btnRedID.style.boxShadow = '';
            }, 250)
            console.log('caso 1');
        break;

        case 2:
            btnBlueID.style.boxShadow = '0px 0px 30px 10px blue';
            setTimeout(function(){
                btnBlueID.style.boxShadow = '';
            }, 250)
            console.log('caso 2');
        break;

        case 3:
            btnGreenID.style.boxShadow = '0px 0px 30px 10px green';
            setTimeout(function(){
                btnGreenID.style.boxShadow = '';
            }, 250)
            console.log('caso 3');
        break;
    }
}


function checkStatus(){
    return document.getElementById('status').innerText;
} 

var btnDisplay = document.getElementById('btnGame');

function resetGame(){
    document.getElementById('status').innerText = "Ready Player 1";
    document.getElementById('lvl').innerText = "-";
    
    btnDisplay.style.backgroundColor = '#be04ec';

    secGame = [];
}

function starGame(){
    console.log('StartGAME');

    document.getElementById('status').innerText = "Playing";
    document.getElementById('lvl').innerText = "1";

    btnDisplay.style.backgroundColor = '#ec0436';
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function addSequenceColor(){
    var random = getRandomInt(0,3);

    secGame.push(random);
    colorBtnSecGlow(random);
}

function sequenceHuman(){

}

function sequenceColor(){

    console.log('newGame');
    var iteration = 0;
    do{
        if (secGame.length != 0){
            console.log(iteration);

            colorBtnSecGlow(secGame[iteration]);

            console.log(secGame[iteration].value);
            console.log("Rompe?");
        }
    }while (iteration++ <= secGame.length-1);
    addSequenceColor();
}

function gameRound(){

    if (checkStatus() === 'Playing'){
        resetGame();
    }else{
        console.log('gameRound');
        starGame();
        sequenceColor();
    }
}




