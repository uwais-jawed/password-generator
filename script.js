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

let checkCount = 1;


handleSlider();
calcStrength();

function copyControl(){
     
}
// set pasword length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;


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



//event listners====

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value){
        copyContent();
    } 
})

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',()=>{
        handleCheckbox();
    })
});

generateBtn.addEventListener('click',()=>{

});

