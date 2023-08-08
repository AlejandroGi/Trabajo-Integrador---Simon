'use strict';

var userName= document.getElementById('userName');
var nameTitle= document.getElementById('titleUser');
var boxName= document.getElementById('boxName');
var player= document.getElementById('player');
var pointsScore= document.getElementById('pointsScore');
var pointsScoreBox= document.getElementById('topPlayers');
var btnGame= document.getElementById('btnGame');
var btnYellowID= document.getElementById('btnYellow');
var btnRedID= document.getElementById('btnRed');
var btnBlueID= document.getElementById('btnBlue');
var btnGreenID= document.getElementById('btnGreen');
var lvlFront= document.getElementById('lvl');
var infoTimerBoxFront= document.getElementById('infoTimer');
var pointsFront= document.getElementById('points');
var timerNumberFront= document.getElementById('timerNumber');
var statusFront= document.getElementById('status'); 

var acumUserNameLetter= 0;
var statusGame;
var secGame= [];
var secHuman= [];
var level= 1;
var points= 0;
var reason= '';
var timeRemainGame= 5;
var position= 0;
var timer;
var flagUse0= false;
var option= false;

userName.addEventListener('keyup',changeTitle);
userName.addEventListener('focus',resetTitleBorder);
pointsScore.addEventListener('mouseleave',closePointsScoreBox);
pointsScoreBox.addEventListener('click',openPointsScoreBox);
btnGame.addEventListener('click',gameRound);
btnYellowID.addEventListener('click',sequenceHuman);
btnRedID.addEventListener('click',sequenceHuman);
btnBlueID.addEventListener('click',sequenceHuman);
btnGreenID.addEventListener('click',sequenceHuman);


/*--------------------------------------------------------------
# boxName
--------------------------------------------------------------*/
/*----------------Resetea el color del borde del titulo----------------*/
function resetTitleBorder(){
    userName.style.borderColor= '';
}

/*----------------Cambia el color del btn principal del juego----------------*/
function changeBtnGameColor(){
    if (userName.value.length > 3 && (acumUserNameLetterFun() === userName.value.length)){
        btnGame.style.backgroundColor= 'var(--color-primary-light)';
        btnGame.style.borderColor= 'var(--color-white)';
        btnGame.style.boxShadow= '';
        btnGame.style.color= '';
        btnGame.innerText= 'START';
    }else{
        btnGame.style.backgroundColor= ''
        btnGame.style.borderColor= 'red';
        btnGame.style.boxShadow= 'none';
        btnGame.style.color= 'red';
        btnGame.innerText= '--';
    }
}

/*----------------Cambia el titulo acorde a lo ingresado----------------*/
function changeTitle(){
    nameTitle.innerText= 'WELCOME ' + userName.value;
    if (userName.value.length === 0){
        nameTitle.innerText= 'WELCOME USER';
    }
    changeBtnGameColor();
}

/*--------------------------------------------------------------
# pointsScore
--------------------------------------------------------------*/
function openPointsScoreBox(){
    pointsScore.style.display= 'flex';
    if (option){
        document.getElementById('nameStorage').style.display= 'none';
        document.getElementById('levelStorage').style.display= 'none';
        document.getElementById('pointsStorage').style.display= 'none';
        document.getElementById('statusStorage').innerText= 'GAME OVER';
        option= false;
    }else{
        document.getElementById('nameStorage').style.display= 'flex';
        document.getElementById('levelStorage').style.display= 'flex';
        document.getElementById('pointsStorage').style.display= 'flex';
        document.getElementById('statusStorage').innerText= 'status';
    }
}


/*--------------------------------------------------------------
# gameOverModal -- Utiliza el mismo fragmento html que el pointsScore
--------------------------------------------------------------*/
/*----------------Despliega el Modal GameOver----------------*/
function launchModalGameOver(){
    openPointsScoreBox();
}   


/*--------------------------------------------------------------
# game
--------------------------------------------------------------*/
/*----------------Actualizo la ronda----------------*/
function updateRound(){
    lvlFront.innerText= ++level;
    infoTimerBoxFront.style.borderColor= '';
    timeRemainGame= 5 + (level * 2);
    position= 0;
    secHuman.length= 0;
    flagUse0= false; /*Esto es para asegurarme que tras hacer update, utilice el 0*/
    resetCountdown(timer);
}

/*----------------Compruebo el largo de la sequencia del juego vs jugador----------------*/
function checkSequences(){
    if (secGame.length === secHuman.length){
        return true;
    }else{
        return false;
    }
}

/*----------------Compruebo el estado de la ronda----------------*/
function checkGame(){
    if (checkSequences()){
        clearInterval(timer); 
        updateRound();
        playGame();
    }
}

/*----------------Compruebo si la seccion del jugador corresponde a la sequencia correcta----------------*/
function checkSequencesClick(){
    if (checkStatus() === 'Playing'){
        if (secGame[position] !== secHuman[position]){       
            reason= 'Sequence error!';
            gameOver(reason);
        }else{
            checkGame();
            pointsFront.innerText= ++points;
        }
        if (flagUse0){
            position++;
        }else{
            flagUse0= true;
        }
    }
}

/*----------------Agrego el boton presionado y comparo----------------*/
function sequenceHuman(){
    if (checkStatus() === 'Playing'){
        switch(this.id){
            case 'btnYellow':
                secHuman.push(0);
                checkSequencesClick();
            break;
            case 'btnRed':
                secHuman.push(1);
                checkSequencesClick();
            break;
            case 'btnBlue':
                secHuman.push(2);
                checkSequencesClick();
            break;
            case 'btnGreen':
                secHuman.push(3);
                checkSequencesClick();
            break;
        }
    }
}

/*----------------Termina la partida----------------*/
function gameOver(reason){
    option= true;
    statusFront.innerText= reason;
    infoTimerBoxFront.style.borderColor= '';
    btnGame.style.backgroundColor= 'var(--color-backGround)';
    btnGame.innerText= 'START';
    secGame.length= 0;
    secHuman.length= 0;
    timeRemainGame= 5;
    position= 0;
    reason= '';
    resetCountdown();
    launchModalGameOver();
}

/*----------------Contador del timer y reduce el puntaje por tiempo----------------*/
function countDown(){
    var timeStartGame;
    var count= 0;

    timeStartGame= timeRemainGame;
    timer= setInterval(function() {
        timerNumberFront.innerText= timeRemainGame;

        if (timeRemainGame === 0 || checkStatus === 'Ready' || checkStatus === 'Sequence error!'){
            reason='Times up';
            clearInterval(timer);
            gameOver(reason);
        }
        if (timeRemainGame <= timeStartGame - (timeStartGame / 2)){
            infoTimerBoxFront.style.borderColor= 'red';
            count++;
            if (count === 2){
                pointsFront.innerText= --points;
                count= 0;
            }
        }
        timeRemainGame--;
    }, 1000);
}

/*----------------Obtiene numero random del 0 al 3----------------*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*----------------Agrega un color a la sequencia de juego----------------*/
function addSequenceColor(){
    var random= getRandomInt(0,3);
    secGame.push(random);
    colorBtnSecGlow(random);
}

/*----------------Prendo y apago el brillo de los colores----------------*/
function colorBtnSecGlow(number){
    switch(number){
        case 0:
            btnYellowID.style.boxShadow= '0px 0px 30px 10px yellow';
            setTimeout(function(){
                btnYellowID.style.boxShadow= '';
            }, 500)
        break;
        case 1:
            btnRedID.style.boxShadow= '0px 0px 30px 10px red';
            setTimeout(function(){
                btnRedID.style.boxShadow= '';
            }, 500)
        break;
        case 2:
            btnBlueID.style.boxShadow= '0px 0px 30px 10px blue';
            setTimeout(function(){
                btnBlueID.style.boxShadow= '';
            }, 500)
        break;
        case 3:
            btnGreenID.style.boxShadow= '0px 0px 30px 10px green';
            setTimeout(function(){
                btnGreenID.style.boxShadow= '';
            }, 500)
        break;
        default: console.log('colorBtnSecGlow - Salida por default');
    }
}

/*----------------Reproduce los colores de la sequencia----------------*/
function sequenceColor(){
    var roundGame= 0;
    var interval= setInterval(function(){
        if (roundGame <=secGame.length - 1){
            colorBtnSecGlow(secGame[roundGame]);
            roundGame++;
        }else{
            addSequenceColor(); 
            clearInterval(interval);   
        }
    }, 800)
}

/*----------------Funcion principal del juego----------------*/
function playGame(){
    sequenceColor();
    setTimeout(function(){
        countDown();
    },800 * level) 
}

/*----------------Actualiza el header con la informacion de la ronda----------------*/
function headerGame(){
    level= 1;
    points= 0;
    statusFront.innerText= 'Playing';
    lvlFront.innerText= level;
    pointsFront.innerText= points;
    btnGame.style.backgroundColor= 'var(--color-resetBtn)';
    btnGame.innerText= 'RESET';
}

/*----------------Cierra el PointsScore----------------*/
function closePointsScoreBox(){
    pointsScore.style.display= '';
}

/*----------------Reinicia el contador----------------*/
function resetCountdown(){
    clearInterval(timer);
    timerNumberFront.innerText= '-';
}

/*----------------Reinicia el juego----------------*/
function resetGame(){
    statusFront.innerText= 'Ready';
    lvlFront.innerText= '-';
    pointsFront.innerText= '-';
    infoTimerBoxFront.style.borderBlockColor= '';
    btnGame.style.backgroundColor= 'var(--color-backGround)';
    btnGame.innerText= 'START';
    secGame.length= 0;
    secHuman.length= 0;
    level= 1;
    timeRemainGame= 5;
    points= 0;
    position= 0;
    reason='';
    resetCountdown();
}

/*----------------Compruebo el estado de la ronda----------------*/
function checkStatus(){
    return statusFront.innerText;
}

/*----------------Comprueba la cantidad de letras del nombre----------------*/
function acumUserNameLetterFun(){
    acumUserNameLetter= 0;
    for (var x= 0; x <= userName.value.length; x++){
        if(userName.value.charAt(x).toLowerCase().search(/[a-z]/) >= 0){ 
            acumUserNameLetter++;
        }
    }
    return acumUserNameLetter;
}

/*----------------Comprueba el usuario ingresado----------------*/
function validateUser(){
    if (userName.value.length > 3 && (acumUserNameLetterFun() === userName.value.length) ){
        player.innerText= userName.value;
        return true;
    }else{
        return false;
    }
}

/*----------------Comportamiento del boton princpal de juego----------------*/
function gameRound(){
    if (validateUser()){
        btnGame.style.backgroundColor= 'var(--color-backGround)';
        boxName.style.display= 'none';
        if (checkStatus() === 'Playing'){
            resetGame();
        }else{
            closePointsScoreBox();
            headerGame();
            playGame();
        }
    }else{
        userName.style.borderColor= 'red';
    }
}