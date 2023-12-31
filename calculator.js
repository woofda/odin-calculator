// Arithmatic functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
let divByZero = false;
const divide = (a, b) => {
    if (b === 0){
        divByZero = true;
        return 0;
    }
    else return a / b;
}

const operate = (a, b, operand) => {
    switch(operand) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return "Error";
    }
}

// Display and number variables
let firstNumber, secondNumber, operator;
let displayValue = '0';
let resetDisplay = false;
let numberUpdated = true;

const display = document.querySelector('.display');

const updateDisplay = () => {
    if(divByZero) {
        // Error message after divide by zero, works like clear
        firstNumber = undefined;
        secondNumber = undefined;
        display.innerText = "stop that";
        divByZero = false;
    } else if(displayValue.length > 11) {
        if(parseFloat(displayValue) > 99999999999) {
            // Swap to e notation for display overflow
            let stringed = parseFloat(displayValue).toExponential().toString();
            display.innerText = stringed.slice(0, 6) + stringed.slice(-4);
        } else {
            // Chop off right side overflow
            display.innerText = displayValue.toString().slice(0, 11);
        }
    } else if(!(displayValue === undefined || displayValue === '')) {
        display.innerText = displayValue;
    }
}



/* ***************** BUTTON EVENT FUNCTIONS ****************** */

// Number button function
const inputNumber = (button) => {
    if(displayValue === '' || displayValue === '0' || resetDisplay) {
        displayValue = button.innerText;
        updateDisplay();
        resetDisplay = false;
        numberUpdated = true;
    } else if (displayValue.length < 11) {
        displayValue += button.innerText;
        updateDisplay();
        numberUpdated = true;
    }
}

// Operator buttons function
const inputOperator = (button) => {
    if(firstNumber === undefined) {
        firstNumber = parseFloat(displayValue);
    } else if(numberUpdated) {
        secondNumber = parseFloat(displayValue);
        displayValue = operate(firstNumber, secondNumber, operator);
        updateDisplay();
        firstNumber = parseFloat(displayValue);
    }

    numberUpdated = false;
    operator = button.innerText;
    resetDisplay = true;
    // Add some button effect here
}

// Equals button function
const inputEquals = () => {
    if(operator !== undefined && numberUpdated) {
        secondNumber = parseFloat(displayValue);
        displayValue = operate(firstNumber, secondNumber, operator).toString();
        updateDisplay();
        firstNumber = undefined;
        secondNumber = undefined;
        operator = undefined;
        resetDisplay = true;
    }
}

// Clear button function
const clear = () => {
    displayValue = '0';
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    numberUpdated = true;
    updateDisplay();
}

// Decimal button function
const inputDot = () => {
    if(resetDisplay) {
        displayValue = '0';
        resetDisplay = false;
    }
    if(!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Negative button function
const negate = () => {
    if(displayValue !== 0) {
        if(!(displayValue.charAt(0) === '-')) {
            displayValue = '-' + displayValue;
        } else {
            displayValue = displayValue.slice(1);
        }
        updateDisplay();
    }
}

// Percent button function
const toPercent = () => {
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}



/* ******************** BUTTON LISTENERS ********************* */

// Number button listeners
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputNumber(button);
    });
});

// Operator button listeners
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        for(each of operatorButtons) {
            if(each !== button) each.classList.remove('selected');
        }
        button.classList.add('selected');
        inputOperator(button);
    })
})

// Clear button listener
document.querySelector('.clear').addEventListener('click', () => {
    for(each of operatorButtons) {
        each.classList.remove('selected');
    }
    clear();
});

// Equals button listener
document.querySelector('.equals').addEventListener('click', () => {
    for(each of operatorButtons) {
        each.classList.remove('selected');
    }
    inputEquals();
})

// Decimal button listener
document.querySelector('.decimal').addEventListener('click', () => {
    inputDot();
})

// Negative button listener
document.querySelector('.negative').addEventListener('click', () => {
    negate();
})

// Percent button listener
document.querySelector('.percent').addEventListener('click', () => {
    toPercent();
})