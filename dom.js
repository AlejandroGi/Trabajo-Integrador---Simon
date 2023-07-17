var statusGame;
var secGame = [];
var secHuman = [];
var playerTurn = false;
var timer = 5000;
var level = 1;

var btnYellowID= document.getElementById('btnYellow');
btnYellowID.addEventListener('click',sequenceHuman);

var btnRedID= document.getElementById('btnRed');
btnRedID.addEventListener('click',sequenceHuman);

var btnBlueID= document.getElementById('btnBlue');
btnBlueID.addEventListener('click',sequenceHuman);

var btnGreenID= document.getElementById('btnGreen');
btnGreenID.addEventListener('click',sequenceHuman);




/*----------------------------GAME-----------------------------*/
var btnGame = document.getElementById('btnGame');
btnGame.addEventListener('click',gameRound);


function colorBtnSecGlow(number){
    debugger;
    console.log('Entro a "colorBtnSecGlow"');
    switch(number){
        case 0:
            btnYellowID.style.boxShadow = '0px 0px 30px 10px yellow';
            setTimeout(function(){
                btnYellowID.style.boxShadow = ''; /*Si no le aclaro propiedades retoma el valor orignal del style*/
            }, 500)
            console.log('caso 0 - Amarillo');
        break;

        case 1:
            btnRedID.style.boxShadow = '0px 0px 30px 10px red';
            setTimeout(function(){
                btnRedID.style.boxShadow = '';
            }, 500)
            console.log('caso 1 - Rojo');
        break;

        case 2:
            btnBlueID.style.boxShadow = '0px 0px 30px 10px blue';
            setTimeout(function(){
                btnBlueID.style.boxShadow = '';
            }, 500)
            console.log('caso 2 - Azul');
        break;

        case 3:
            btnGreenID.style.boxShadow = '0px 0px 30px 10px green';
            setTimeout(function(){
                btnGreenID.style.boxShadow = '';
            }, 500)
            console.log('caso 3 - Verde');
        break;
    }
}


function checkStatus(){
    return document.getElementById('status').innerText;
} 

function resetGame(){
    document.getElementById('status').innerText = "Ready Player 1";
    document.getElementById('lvl').innerText = "-";
    
    btnGame.style.backgroundColor = '#be04ec';

    secGame.length=0;
    secHuman.length=0;
    level=1;
    timer= 5000;
}

function starGame(){
    document.getElementById('status').innerText = "Playing";
    document.getElementById('lvl').innerText = level;

    btnGame.style.backgroundColor = '#ec0436';
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function addSequenceColor(){
    var random = getRandomInt(0,3);

    console.log("addSequenceColor - se agrego a la secuencia de numeros a repetir el numero: "+ random);
    
    secGame.push(random);
    colorBtnSecGlow(random);
}

function sequenceHuman(){
    if (checkStatus() === 'Playing'){
        switch(this.id){
            case 'btnYellow':
                secHuman.push(0);
                console.log("se agrego el numero 0 a los presionados.");
            break;
            case 'btnRed':
                secHuman.push(1);
                console.log("se agrego el numero 1 a los presionados.");
            break;
            case 'btnBlue':
                secHuman.push(2);
                console.log("se agrego el numero 2 a los presionados.");
            break;
            case 'btnGreen':
                secHuman.push(3);
                console.log("se agrego el numero 3 a los presionados.");
            break;
        }
    }
    /*console.log('secuenceHuman' + this.id);*/
}



function sequenceColor(){
    var expandTimeContinue = 500;
    debugger;
    if (secGame.length != 0){
        for(roundGame=0; roundGame < secGame.length; roundGame++){
            console.log("sequenceColor - iteracion:" + roundGame);

            setTimeout(function(){
                colorBtnSecGlow(secGame[roundGame])      
            }, expandTimeContinue)
            
            expandTimeContinue = expandTimeContinue + 100; 
               
        
/*
            colorBtnSecGlow(secGame[roundGame]); 
            console.log("sequenceColor - Se prendio el color:" + secGame[roundGame]);*/
        }
    }
    /*la idea del for, es ir agregando mas tiempo a la espera para cada repeticion.
     Asi da la isluasion que la secuencia de luces se prende con un timpo en el medio
     Tengo que buscar una mejor forma de aplicarlo. */
     
    addSequenceColor();
    
}

function checkSequences(){
var error= false;

console.log("cadena a repetir: " + secGame);
console.log("cadena ingresada: " + secHuman);

    if (secGame.length == secHuman.length){
        for (x=0; x<=secGame.length-1; x++){
           if(secGame[x] != secHuman[x]){
             error=true;
             console.log("error de pickeo:" + error);
             break;
           }
        }

       if (error){
        /*gameOver("Error en la secuencia!");*/
        return false;
       }else{
        return true;
       }
       
    }else{
        /*gameOver("La longitud de la cadena ingresada no coincide!");*/
        console.log("La longitud de la cadena ingresada no coincide!");
        return false;
    }
    
}

function updateRound(){
    timer=timer + 1000;
    document.getElementById('lvl').innerText = ++level;
}

function gameOver(){
    resetGame();
}

function playGame(){
    var play;
    secHuman.length= 0; /*tengo que reiniciar la secuencia en cada ronda*/
                        /*y por si estoy tocando los botones antes de arrancar*/
    console.log("-------------------------------------");

    sequenceColor();
    setTimeout(function(){
        play= checkSequences();
        if (play){
        updateRound();
        playGame();/*Aca hago la iteracion por ronda superada*/
        }else{
        console.log("Juego terminado");
        /*gameOver();*/
        }
    }, timer)   
}

function gameRound(){
    if (checkStatus() === 'Playing'){
        resetGame();
    }else{
        starGame();
        playGame();
    }
}