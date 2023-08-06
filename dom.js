/*--------------------------------------------------------------
# boxName
--------------------------------------------------------------*/
var userName= document.getElementById('userName');
userName.addEventListener('keyup',changeTitle);
userName.addEventListener('focus',resetTitleBorder);

var nameTitle= document.getElementById('titleUser');
var boxName= document.getElementById('boxName');
var player= document.getElementById('player');
var acumUserNameLetter= 0;
/*----------------Resetea el color del borde del titulo----------------*/
function resetTitleBorder(){
    userName.style.borderColor= "";
}

/*----------------Cambia el color del btn principal del juego----------------*/
function changeBtnGameColor(){
    if (userName.value.length > 3 && (acumUserNameLetterFun() == userName.value.length)){
        btnGame.style.backgroundColor= "var(--color-primary-light)";
        btnGame.style.borderColor= "var(--color-white)";
        btnGame.style.boxShadow= "";
        btnGame.style.color= "";
        btnGame.innerText= "START";
    }else{
        btnGame.style.backgroundColor= ""
        btnGame.style.borderColor= "red";
        btnGame.style.boxShadow= "none";
        btnGame.style.color= "red";
        btnGame.innerText= "--";
    }
}

/*----------------Cambia el titulo acorde a lo ingresado----------------*/
function changeTitle(){
    nameTitle.innerText= 'WELCOME ' + userName.value;
    if (userName.value.length == 0){
        nameTitle.innerText= 'WELCOME USER';
    }
    changeBtnGameColor();
}

/*----------------Comprueba la cantidad de letras del nombre----------------*/
function acumUserNameLetterFun(){
    acumUserNameLetter= 0;
    for (x= 0; x <= userName.value.length; x++){
        if(userName.value.charAt(x).toLowerCase().search(/[a-z]/) >= 0){ 
            acumUserNameLetter++;
        }
    }
    return acumUserNameLetter;
}

/*----------------Comprueba el usuario ingresado----------------*/
function validateUser(){
    if (userName.value.length > 3 && (acumUserNameLetterFun() == userName.value.length) ){
        player.innerText= userName.value;
        return true;
    }else{
        return false;
    }
}


/*--------------------------------------------------------------
# pointsScore
--------------------------------------------------------------*/
var pointsScore= document.getElementById('pointsScore');
pointsScore.addEventListener('mouseleave',closePointsScoreBox);

var pointsScoreBox= document.getElementById('topPlayers');
pointsScoreBox.addEventListener('click',openPointsScoreBox);

function openPointsScoreBox(){
    pointsScore.style.display= "flex";
    if (option){
        document.getElementById('nameStorage').style.display= "none";
        document.getElementById('levelStorage').style.display= "none";
        document.getElementById('pointsStorage').style.display= "none";
        document.getElementById('statusStorage').innerText= "GAME OVER";
        option= false;
    }else{
        document.getElementById('nameStorage').style.display= "flex";
        document.getElementById('levelStorage').style.display= "flex";
        document.getElementById('pointsStorage').style.display= "flex";
        document.getElementById('statusStorage').innerText= "status";
    }
}

function closePointsScoreBox(){
    pointsScore.style.display= "";
}


/*--------------------------------------------------------------
# gameOverModal -- Utiliza el mismo fragmento html que el pointsScore
--------------------------------------------------------------*/
function launchModalGameOver(){
    openPointsScoreBox();
}   


/*--------------------------------------------------------------
# game
--------------------------------------------------------------*/
var statusGame;
var secGame= [];
var secHuman= [];
var level= 1;
var points= 0;
var reason= "";
var timeRemainGame= 5;
var position= 0;
var timer;
var flagUse0= false;
var option= false;

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

var lvlFront= document.getElementById('lvl');
var infoTimerBoxFront= document.getElementById('infoTimer');
var pointsFront= document.getElementById('points');
var timerNumberFront= document.getElementById('timerNumber');
var statusFront= document.getElementById('status'); 

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
        default: console.log("colorBtnSecGlow - Salida por default");
    }
}

/*----------------Actualizo la ronda----------------*/
function updateRound(){
    lvlFront.innerText= ++level;
    infoTimerBoxFront.style.borderColor= "";
    timeRemainGame= 5 + (level*2);
    position= 0;
    secHuman.length= 0;
    flagUse0= false; /*Esto es para asegurarme que tras hacer update, utilice el 0*/
    resetCountdown(timer);
}

/*----------------Compruebo el largo de la sequencia del juego vs jugador----------------*/
function checkSequences(){
    if (secGame.length == secHuman.length){
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
    if (checkStatus() == 'Playing'){
        if (secGame[position] != secHuman[position]){       
            reason= "Sequence error!";
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
    if (checkStatus() == 'Playing'){
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

/*----------------Reinicia el contador----------------*/
function resetCountdown(){
    clearInterval(timer);
    timerNumberFront.innerText= "-";
}
/*********************************************************** */
/*
// Guardar en localstorage
var saveScoreLocalStorage = function (gameScore) {

    var scoreList = getScoreFromLocalStorage();
    scoreList.push(Object.fromEntries(gameScore));

    // Ordenar el arreglo de puntajes por el valor de "puntaje_final" de forma descendente
    scoreList.sort(function (a, b) {
        return b.puntaje_final - a.puntaje_final;
    });

    localStorage.setItem("puntajes", JSON.stringify(scoreList))

}

// Función para obtener la fecha
function currentDate(){
    
    // This arrangement can be altered based on how we want the date's format to appear.
    var currentDateValue= `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return currentDateValue;
}

// Función para obtener la lista de puntajes del localStorage
function getScoreFromLocalStorage(){
    var scoreString= localStorage.getItem("Points");
    if (!scoreString) {
        return [];
    }
    return JSON.parse(scoreString);
}

json.roles.MOD.forEach(function(item) {
    console.log(item.join());
});


function saveLocalStorage(){
    var localStorageItem;
    localStorageItem.setItem('User',userName.value);
    localStorageItem.setItem('Level',level);
    localStorageItem.setItem('Points',points);
    localStorageItem.setItem('Status',reason);
    localStorageItem.setItem('Date',currentDate());
    return localStorageItem;
}
*/

/*********************************************************** */
/*----------------Termina la partida----------------*/
function gameOver(reason){
    option= true;
    statusFront.innerText= reason;
    infoTimerBoxFront.style.borderColor= "";
    btnGame.style.backgroundColor= '#be04ec';
    btnGame.innerText= "START";
    secGame.length= 0;
    secHuman.length= 0;
    timeRemainGame= 5;
    position= 0;
    reason= "";
    resetCountdown();
    launchModalGameOver();
    //saveLocalStorage();
}

/*----------------Contador del timer y reduce el puntaje por tiempo----------------*/
function countDown(){
    var timeStartGame;
    var count= 0;

    timeStartGame= timeRemainGame;
    timer= setInterval(function() {
        timerNumberFront.innerText= timeRemainGame;

        if (timeRemainGame == 0 || checkStatus == "Ready" || checkStatus == "Sequence error!"){
            reason="Times up";
            clearInterval(timer);
            gameOver(reason);
        }
        if (timeRemainGame <= timeStartGame-(timeStartGame/2)){
            infoTimerBoxFront.style.borderColor= "red";
            count++;
            if (count == 2){
                pointsFront.innerText= --points;
                count= 0;
            }
        }
        timeRemainGame--;
    }, 1000);
}

/*----------------Compruebo el estado de la ronda----------------*/
function checkStatus(){
    return statusFront.innerText;
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

/*----------------Reproduce los colores de la sequencia----------------*/
function sequenceColor(){
    var roundGame= 0;
    var interval= setInterval(function(){
        if (roundGame <=secGame.length-1){
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
/* La idea es que comience el countdown al terminar la serie. 
    Si la serie esta en el nivel 3, por lo tanto son 3 pasadas por el sequenceColor que tiene un intervalo de 850 (lag operacion 50).
*/

/*----------------Actualiza el header con la informacion de la ronda----------------*/
function headerGame(){
    statusFront.innerText= "Playing";
    lvlFront.innerText= level;
    pointsFront.innerText= points;
    btnGame.style.backgroundColor= '#ec0436';
    btnGame.innerText= "RESET";
}

/*----------------Reinicia el juego----------------*/
function resetGame(){
    statusFront.innerText= "Ready";
    lvlFront.innerText= "-";
    pointsFront.innerText= "-";
    infoTimerBoxFront.style.borderBlockColor= "";
    btnGame.style.backgroundColor= '#be04ec';
    btnGame.innerText= "START";
    secGame.length= 0;
    secHuman.length= 0;
    level= 1;
    timeRemainGame= 5;
    points= 0;
    position= 0;
    reason="";
    resetCountdown();
}

/*----------------Comportamiento del boton princpal de juego----------------*/
function gameRound(){
    if (validateUser()){
        btnGame.style.backgroundColor= '#be04ec';
        boxName.style.display= 'none';
        if (checkStatus() == 'Playing'){
            resetGame();
        }else{
            closePointsScoreBox();
            headerGame();
            playGame();
        }
    }else{
        userName.style.borderColor= "red";
    }
}