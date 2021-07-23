const Buttons= document.getElementsByClassName('button');
const numberButton = document.getElementsByClassName('number');
const operatorButton = document.getElementsByClassName('operator');
const display = document.querySelector('.display');
let equationArray = [];
console.log(Buttons);


Array.prototype.forEach.call(Buttons, (button) =>{
    let value = button.textContent;
    let operatorValue;
    button.addEventListener('click', () =>{
       //If the display shows a zero and a number button is pressed, the display will show number
        if(display.textContent === "0" && button.classList.contains('number')) {
           display.textContent = value;
    // If another number button is pressed, it will append the number to the existing one on display   
        } else if(button.classList.contains('number')) {
            display.textContent += value;
    //  If the button pressed is an operator and the display is not showing zero 
        } else if(button.classList.contains('operator') && display.textContent !== "0") {
            equationArray.push(display.textContent); // The displayed number is pushed to array 
            operatorValue = value; // The value of the operator button is stored to variable 
            equationArray.push(operatorValue); // The operator value is pushed to array
            display.textContent = "0"; // The display goes back to zero
    //  If the equal button is pressed 
        } else if(value === '=') {
            equationArray.push(display.textContent);// The displayed number is pushed to array
            compute(equationArray); // The compute function is invoked
            
    // If the AC button is pressed, the screen goes back to zero and the array empties out 
        } else if(value === 'AC') {
            display.textContent = "0";
            equationArray = [];
        }
        
        console.log(equationArray);
        
    });
});

function compute(arr) {
    let matchBeginChar = /\d+\./g; //RegEx tests if  first value is number or decimal
    let matchMultiOp = /(\D)\1/g; //RegEx tests if there are multiple operators in a row
    let duplicateOp;
    let concat = "";
    for(let i = 0; i <= arr.length; i++) {
        concat += arr[i] ;
    }
        cleanString = concat.replace(matchBeginChar, "");
        duplicateOp = cleanString.match(matchMultiOp);
        console.log(duplicateOp);
        return console.log(cleanString);
}

