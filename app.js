const Buttons= document.getElementsByClassName('button');
const numberButton = document.getElementsByClassName('number');
const operatorButton = document.getElementsByClassName('operator');
const display = document.querySelector('.display');
let equationArray = [];


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
            console.log(equationArray);
            compute(equationArray); // The compute function is invoked
            
    // If the AC button is pressed, the screen goes back to zero and the array empties out 
        } else if(value === 'AC') {
            display.textContent = "0";
            equationArray = [];
        }
        
        
        
    });
    
});

function compute(arr) {
    let operators = {
        "+": function(a, b) {return a + b},
        "-": function(a, b) {return a - b},
        "X": function(a, b) {return a * b},
        "/": function(a, b) {return a / b}
    }
    let numTest = /\d/g;
    let floatTest = /\./g;
    let operatorTest = /[+\-X/]/g;
    let num1 = null;
    let num2 = null;
    let operator;
    let total = 0;

    function testEquation() {
     
        if( num1 !== null && num2 !== null) {
            total = operators[operator](num1, num2);
            num1 = total; 
            num2 = null;
            operator = null;
        }
        console.log(total);
       
    };


    for(let i = 0; i <= arr.length; i++) {
        if(operatorTest.test(arr[i]) === true) {
            operator = arr[i];
            console.log(operator);
        } else if(numTest.test(arr[i]) === true && num1 !== 0 ) {
             num1 = parseInt(arr[i]);
            console.log(num1);
        } else if(numTest.test(arr[i]) === true && num2 !== 0 ) {
             num2 = parseInt(arr[i]);
             console.log(num2);
             testEquation();
        } else if(floatTest.test(arr[i]) === true ) {
             num1 = parseFloat(arr[i]);
        } else if(floatTest.test(arr[i]) === true ) {
             num2 = parseFloat(arr[i]);
            testEquation();
        } 
       
    };
   
    return console.log(total);
      
        
};

