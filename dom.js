/*--------------------------------------------------------------
# boxName
--------------------------------------------------------------*/
var userName= document.getElementById('userName');
userName.addEventListener('keyup',changeTitle);
userName.addEventListener('focus',changeBackTitle);


var nameTitle= document.getElementById('titleUser');
var boxName= document.getElementById('boxName');

var op= false;


function changeBackTitle(){
    userName.style.borderColor= "";
}

function changeBtnGameColor(){
    if (userName.value.length > 3){
        btnGame.style.backgroundColor= "var(--color-primary-light)";
        btnGame.style.borderColor= "var(--color-white)";
        btnGame.style.boxShadow= "";
        btnGame.style.color= "";
        btnGame.innerText= "START";
    }else{
        btnGame.style.backgroundColor= ""
        btnGame.style.borderColor= "red";
        btnGame.style.boxShadow="none";
        btnGame.style.color= "red";
        btnGame.innerText= "--";
    }
}

function changeTitle(){
    nameTitle.innerText = 'WELCOME ' + userName.value;
    if (userName.value.length == 0){
        nameTitle.innerText = 'WELCOME USER';
    }
    changeBtnGameColor();
}

function validateUser(){
    if (userName.value.length > 3){
        document.getElementById('player').innerText= userName.value;
        return true; 
    }else{
        return false;
    }
    

}

/*--------------------------------------------------------------
# game
--------------------------------------------------------------*/
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
    console.log("/---------------updateRound-------------/");
    document.getElementById('lvl').innerText = ++level;
    document.getElementById('infoTimer').style.borderColor= "";
    timeRemainGame= 5 + (level*2 + 1);/*El +1 para que se vea el 10 en el timer*/
    timerIteration= timeRemainGame*1000 + (level*2*1000);
    position= 0;
    secHuman.length= 0;
    
    resetCountdown(timer);
}

function checkSequences(){
    console.log("/---------------checkSequences-------------/");
    if (secGame.length == secHuman.length){
        return true;
    }else{
        return false;
    }
}

function checkGame(){
    if (checkSequences()){
        console.log("/----------checkGame - TRUE -----------/");
        clearInterval(timer); 
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
           
            reason= "Sequence error!";
            gameOver(reason);
        }else{
            clearInterval(timer); 
            console.log("/-----------------checkStatus FALSE----------/");
            console.log("posicion: " + position);
            console.log("checkSequencesClick -- secGameCadena:" + secGame);
            console.log("checkSequencesClick -- secHumanCadena:" + secHuman);
            console.log("checkSequencesClick -- secGame:" + secGame[position]);
            console.log("checkSequencesClick -- secHuman:" + secHuman[position]);
            checkGame();
            
            document.getElementById('points').innerText= ++points;
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
    document.getElementById('timerNumber').innerText= "-";
}

function gameOver(reason){
    document.getElementById('status').innerText= reason;
    
    btnGame.style.backgroundColor= '#be04ec';
    btnGame.innerText= "START";

    secGame.length= 0;
    secHuman.length= 0;
    timerIteration= 5000;
    timeRemainGame= 5;
    position= 0;
    console.log(reason);

    resetCountdown();
}



/*----------------Contador del timer----------------*/
function countDown(){
    var timeStartGame;
    var count= 0;

    timeStartGame= timeRemainGame;
    timer= setInterval(function() {
        document.getElementById('timerNumber').innerText= timeRemainGame;

        if (timeRemainGame == 0 || checkStatus == "Ready" || checkStatus == "Sequence error!"){
            reason="Times up";
            clearInterval(timer);
            gameOver(reason);
        }
        if (timeRemainGame <= timeStartGame-(timeStartGame/2)){
            document.getElementById('infoTimer').style.borderColor= "red";
            count++;
            if (count == 2){
                document.getElementById('points').innerText= --points;
                count= 0;
            }
        }
        timeRemainGame--;
    }, 1000);
}

function checkStatus(){
    return document.getElementById('status').innerText;
} 

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function addSequenceColor(){
    console.log("/---------------addSequenceColor----------");
    var random = getRandomInt(0,3);
    secGame.push(random);
    colorBtnSecGlow(random);
}

function sequenceColor(){
    console.log("/------------sequenceColor--------------");
    var roundGame= 0;
    var interval= setInterval(function(){
        if (roundGame <=secGame.length-1){
            colorBtnSecGlow(secGame[roundGame]);
            console.log("Brilla color" + secGame[roundGame]);
            roundGame++;
        }else{
            addSequenceColor(); 
            clearInterval(interval);   
        }
    }, 800)
}


function playGame(){
    sequenceColor();
    setTimeout(function(){
        countDown();
    },800 * level) 
}
 /* La idea es que comience el countdown al terminar la serie. 
    Si la serie esta en el nivel 3, por lo tanto son 3 pasadas por el sequenceColor que tiene un intervalo de 850 (lag operacion 50).
*/

function starGame(){
    document.getElementById('status').innerText= "Playing";
    document.getElementById('lvl').innerText= level;
    document.getElementById('points').innerText= points;

    btnGame.style.backgroundColor= '#ec0436';
    btnGame.innerText= "RESET";
}

function resetGame(){
    document.getElementById('status').innerText= "Ready";
    document.getElementById('lvl').innerText= "-";
    document.getElementById('points').innerText= "-";
    
    btnGame.style.backgroundColor= '#be04ec';
    btnGame.innerText= "START";

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
    if (validateUser()){
        btnGame.style.backgroundColor= '#be04ec';
        boxName.style.display= 'none';
        if (checkStatus() == 'Playing'){
            resetGame();
        }else{
            starGame();
            playGame();
        }
    }else{
        userName.style.borderColor= "red";
    }
}