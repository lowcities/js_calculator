const Buttons= document.getElementsByClassName('button');
const numberButton = document.getElementsByClassName('number');
const operatorButton = document.getElementsByClassName('operator');

let equationArray = [];
const calculator = {
    displayValue: '0',
    waitingForOperator: true,  
};

function inputValue(key) {
    const { displayValue, waitingForOperator } = calculator;

        if(waitingForOperator == false) {
            calculator.displayValue = key;
            calculator.waitingForOperator = true;
            console.log('condition1');
        } else {
            calculator.displayValue = displayValue === '0' ? key : displayValue + key;
           console.log(calculator.displayValue);
            console.log('condition2');
        }
    
}

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = calculator.displayValue;
}

//Function to delete last character from displayed value
function del (x) {
    let last = x.charAt(x.length - 1)
    return x.replace(last, "");
    
}

Array.prototype.forEach.call(Buttons, (button) =>{
    
    button.addEventListener('click', (event) =>{
       
        let target = event.target.parentNode;
        console.log(target.value);

        if(target.classList.contains('operator')) {
            equationArray.push(calculator.displayValue); // The displayed number is pushed to array 
            operatorValue = target.value; // The value of the operator button is stored to variable 
            equationArray.push(operatorValue); // The operator value is pushed to array
            calculator.waitingForOperator = false;
            updateDisplay();
            return;
        }

        if(target.value === '=') {
            equationArray.push(calculator.displayValue);// The displayed number is pushed to array
            console.log(equationArray);
            compute(equationArray); // The compute function is invoked
            updateDisplay();
            return;
        }

        if(target.value === 'AC') {
            calculator.displayValue = "0";
            updateDisplay();
            equationArray = [];
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
    let operatorTest = /[+\-\\*]/g;
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
    
    equationArray = [];
    // equationArray.push(total);
    calculator.displayValue = total;
    return console.log(total);
      
        
};

