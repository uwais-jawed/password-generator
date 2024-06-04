const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-length]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMessage]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowecaseCheck = document.querySelector("#lowercase");
const numbercheck = document.querySelector("#numbers");
const symbolcheck = document.querySelector("#symbols");
const indicator = document.querySelector(".strength-circle");
const generateBtn = document.querySelector("[generate-password]");
const allCheckBox = document.querySelector("input[type=checkbox]");
const randSymbols = "!@#$%^&*()_[]{};:<>/?";
let password = "";
let passwordLength = 10;

let checkCount = 0;


handleSlider();

function copyControl(){
     
}
// set pasword length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //shows the length of password

}

function generatePassword(){


}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRandInteger(min, max){
    Math.floor(Math.random() * (max-min)) + min;

}

function generateRandNumber(){
    return getRandInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandInteger(97,123));

}

function generateUpperCase(){
    return String.fromCharCode(getRandInteger(65,91));
}

function generateSymbols(){
    const randNum = getRandInteger(0, randSymbols.length);
    return randSymbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false; 
    let hasLower = false; 
    let hasNumber = false;
    let hasSymbols = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowecaseCheck.checked) hasLower = true;
    if (numbercheck.checked) hasNumber = true;
    if (symbolcheck.checked) hasSymbols = true;

    if(hasUpper && hasLower && hasNumber && hasSymbols && passwordLength>=8){
        setIndicator("#02B100");
    }
    else if(hasUpper && hasLower && (hasNumber || hasSymbols)&& passwordLength>=8){
        setIndicator("#00FF2E");
    }
    else if(hasUpper && hasLower && passwordLength >=6){
        setIndicator("#FFFB00");
    }
    else if((hasLower || hasUpper) && passwordLength >=4){
        setIndicator("#FF0000")
    }
    else{
        setIndicator("#0000")
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay, value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "not copied";
    }
    //copy mesgs visible
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000);

}

console.log ("wow");

function shufflePassword(array){
    //fisher yates method = apply on array and shuffle it.
    for (let i = arr.length - 1; i > 0; i--)
    {
     
        // Pick a random index from 0 to i inclusive
        const j = Math.floor(Math.random() * (i + 1)); 
 
        // Swap arr[i] with the element 
        // at random index 
        [arr[i], arr[j]] = [arr[j], arr[i]];
    } 
    let str = "";
    array.forEach((el) => (str+=el));
    return str;
} 

console.log("wpwwppwpw");

//event listners====
function handleCheckbox(){
    checkCount = 0 ; 
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special
    if(passwordLength < checkCount ){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckbox);
})

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value){
        copyContent();
    } 
})

console.log("helo")

generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) {
        return;
    }
    console.log("hello")
    if(password<checkCount){
        passwordLength = checkCount;
        handleSlider();

    }

    console.log("starting the journey")
    password="";

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowecaseCheck){
        funcArr.push(generateLowerCase);

    }

    if(numbercheck.checked){
        funcArr.push(generateRandNumber);
    
    }

    if(symbolcheck.checked){
        funcArr.push(generateSymbols);
    }

    //compulsory include;;
    for (let i = 0 ; i<funcArr.length ; i++){
        password += funcArr[i]();
    }
    console.log("compulsory done");
    //remaining includeing;
    for(let i = 0 ; i<passwordLength - funcArr.length ; i++){
        let randindex = getRandInteger(0, funcArr.length);
        password += funcArr[randindex]();
    }
    console.log("remainign done");

    //shuffle pass'

    password = shufflePassword(Array.from(password));
    console.log("shiuffke done")
    //shhow in input

    passwordDisplay.value = password;
    console.log("display done")
    //strength
    calcStrength();
});
