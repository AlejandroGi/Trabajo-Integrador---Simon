var allMsgError = document.getElementsByClassName('error');

/*----------------------------CLEAR INPUT-----------------------------*/
function clearWarningInput(){
    this.nextElementSibling.innerText= "";
}


/*----------------------------VALIDATE NAME-----------------------------*/
var nameInput = document.getElementById('name');
nameInput.addEventListener('blur',validateName);
nameInput.addEventListener('focus',clearWarningInput);

function validateName(){
    var acum=0;  
    var errorMsg="";

    for (x=0; x <= nameInput.value.length; x++){
        if(nameInput.value.charAt(x).toLowerCase().search(/[a-z]/) >= 0){ 
            acum++;
        }
    }
    if(acum != nameInput.value.length){
        errorMsg= "The Name cannot contain numbers or special characters. ";
    }else{
        if(nameInput.value.length < 6){
            errorMsg=errorMsg+ "The Name has less than 6 alphabetic characters. ";
        }
    }
    document.getElementById('error-name').innerHTML= errorMsg;

}


/*----------------------------VALIDATE SURNAME-----------------------------*/
var surnameInput = document.getElementById('surname');
surnameInput.addEventListener('blur',validateSurname);
surnameInput.addEventListener('focus',clearWarningInput);

function validateSurname(){
    var acum=0;  
    var errorMsg ="";

    for (x=0; x <= surnameInput.value.length; x++){
        if(surnameInput.value.charAt(x).toLowerCase().search(/[a-z]/) >= 0){ 
            acum++;
        }
    }
    if(acum != surnameInput.value.length){
        errorMsg= "The Last Name cannot contain numbers or special characters. ";
    }else{
        if(surnameInput.value.length < 6){
            errorMsg=errorMsg+ "The Last Name has less than 6 alphabetic characters. ";
        }
    }
    document.getElementById('error-surname').innerHTML= errorMsg;

}


/*----------------------------VALIDATE EMAIL-----------------------------*/
var emailInput = document.getElementById('email');
emailInput.addEventListener('blur',validateEmail);
emailInput.addEventListener('focus',clearWarningInput);

function validateEmail(){
    var errorMsg="";

    if(email.value.search(/[@]/) < 0){ 
        errorMsg = errorMsg + " The email format must contain '@'. ";
    } 
    if(email.value.search(/[.]/) < 0){ 
        errorMsg = errorMsg + " The email format must contain '.'. ";
    } 
    document.getElementById('error-email').innerText= errorMsg;
}


/*----------------------------VALIDATE MESSAGE-----------------------------*/
var messageInput = document.getElementById('message');
messageInput.addEventListener('blur',validateMessage);
messageInput.addEventListener('focus',clearWarningInput);

function validateMessage(){
    var errorMsg="";

    if(message.value.length == 0){
        errorMsg= "The message is empty!"
    }
    document.getElementById('error-message').innerText= errorMsg;

}


/*----------------------------BTN SEND-----------------------------*/
var btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click', checkInputs)

function checkInputs(){
    var flagErrorEmpty = true;
    var flagErrorInputEmpty=true;
    var allMsgErrorString =[];
    var allInputs = [];
    
    allMsgError=document.getElementsByClassName('error');

    for (x = 0; x < allMsgError.length; x++){
        if(allMsgError[x].innerText != ''){
            flagErrorEmpty = false; //Si encuentra un error -> Falso
        }
    }

    allInputs=document.querySelectorAll('form input');

    for (x = 0; x < allInputs.length; x++){
        if(allInputs[x].value === '') { 
            flagErrorInputEmpty = false; //Si encuentra un campo vacio ->Falso
        }
    }

    if(flagErrorEmpty && flagErrorInputEmpty){
        alert(nameInput.value + surnameInput.value + emailInput.value + messageInput.value);

        console.log("mandar mail");
    }else{
        if(!flagErrorInputEmpty){
            alert('You must complete all the inputs');
        }else{
            for (x = 0; x < allMsgError.length; x++){
                allMsgErrorString=allMsgErrorString+ allMsgError[x].innerText;
            }
            alert(allMsgErrorString);
        }
    } 
    allMsgErrorString= "";


}

