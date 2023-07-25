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
let displayValue = '';
let resetDisplay = false;
let numberUpdated = true;

const display = document.querySelector('.display');

const updateDisplay = () => {
    if(divByZero) {
        firstNumber = undefined;
        secondNumber = undefined;
        display.innerText = "Hey, you can't do that!";
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
    } else {
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
    if(operator !== undefined) {
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
        if(!displayValue.includes('-')) {
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
        inputOperator(button);
    })
})

// Clear button listener
document.querySelector('.clear').addEventListener('click', () => {
    clear();
});

// Equals button listener
document.querySelector('.equals').addEventListener('click', () => {
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