const Buttons = document.getElementsByClassName('button');
const numberButton = document.getElementsByClassName('number');
const operatorButton = document.getElementsByClassName('operator');
const display = document.querySelector('.display');

let equationArray = [];

const calculator = {
    displayValue: '0', //Current value on the calculator display
    waitingForOperator: true,  //Boolean to test if an operator key has just been pressed
};

//Function for Digit key presses
function inputValue(key) {
    const { displayValue, waitingForOperator } = calculator;

        if(waitingForOperator == false) { // If previous key was an operator  
            calculator.displayValue = key; //overwrite display with new digits
            calculator.waitingForOperator = true; //boolean is true until next operator key press
        } else {
            calculator.displayValue =  //Calculator will display
            displayValue === '0' // if current display = 0
            ? // then
            key //Calculator will display whatever the value of key is
            : // else
            displayValue + key; //Calculator will display what the currently displayed value + whatever the value of key is
        }
    
}

//Function updates the screen on calculator app with calculator display Value
function updateDisplay() {
    let {displayValue} = calculator;
    console.log(calculator.displayValue);
    display.textContent = displayValue.length > 27 ? display.textContent += "" : calculator.displayValue;
}

//Function to delete last character from displayed value
function del (x) {
    let last = x.charAt(x.length - 1);
    //if only one character on screen display 0 else: replace last item with nothing
    return x = x.length === 1 ? x = '0' : x.replace(last, "");
}

Array.prototype.forEach.call(Buttons, (button) =>{
    button.addEventListener('click', (event) =>{
        let target = event.target.parentNode;
        const {waitingForOperator} = calculator;
        console.log(target.value);
        if(target.classList.contains('operator')) {
            equationArray.push(calculator.displayValue);    //The displayed number is pushed to array 
            operatorValue = target.value;   //The value of the operator button is stored to variable 
            equationArray.push(operatorValue);  // The operator value is pushed to array
            calculator.waitingForOperator = false;  //Program no longer waiting on operator
            display.textContent = "";   //////////////////\display value blinks momentarily
            setTimeout(() => {updateDisplay()},100) ///////to acknowledge operator key press
            return;
        }
        if(target.value === '.') {
            let decimalTest = /\.+/g; //Regex to find decimal
            calculator.displayValue += //If no decimal currently exists on display, then add decimal. else add nothing
            !decimalTest.test(calculator.displayValue) ? '.' : "";
            updateDisplay(); //Display is updated with decimal
            return;
        }
        if(target.classList.contains('equal-btn')) {
            calculator.waitingForOperator = false;
            equationArray.push(calculator.displayValue);    //The displayed number is pushed to array
            calculator.displayValue = compute(equationArray);  //display value will equal the return value of compute
            updateDisplay();    //Display is updated with equation answer
            return
        }
        if(target.value === 'AC') {
            calculator.displayValue = "0";  //If clear btn is pressed disp val becomes 0
            updateDisplay();    //display is updated
            equationArray = []; //equation array is cleared
            return;
        }
        if(target.value === 'DEL') {
            calculator.displayValue = del(calculator.displayValue); //If del key pressed, return value of del function is stored to cal.disp
            updateDisplay();    //display is updated
            return;
        }

        inputValue(target.value);
        updateDisplay();
    });
    
});

function compute(arr) {
    let operators = {
        "+": function(a, b) {return a + b},
        "-": function(a, b) {return a - b},
        "*": function(a, b) {return a * b},
        "/": function(a, b) {return a / b}
    }
    let numTest = /\d/g;
    let floatTest = /\./g;
    let operatorTest = /[+\-/*]/g;
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
        } else if(numTest.test(arr[i]) === true && num1 == null ) {
             num1 = parseInt(arr[i]);
            console.log(num1);
        } else if(numTest.test(arr[i]) === true && num2 == null ) {
             num2 = parseInt(arr[i]);
             console.log(num2);
             testEquation();
        } else if(floatTest.test(arr[i]) === true && num1 == null ) {
             num1 = parseFloat(arr[i]);
        } else if(floatTest.test(arr[i]) === true && num2 == null ) {
             num2 = parseFloat(arr[i]);
            testEquation();
        } 
       
    };
    
    equationArray = [];
    
    return total;
      
        
};

