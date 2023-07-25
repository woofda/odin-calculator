// Arithmatic functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

const display = document.querySelector('.display');

const updateDisplay = () => {
    if(!(displayValue === undefined || displayValue === '')) {
        display.innerText = displayValue;
    }
}

const clear = () => {
    displayValue = '0';
    firstNumber = undefined;
    secondNumber = undefined;
    updateDisplay();
}

// Event called to add numbers to display
const inputNumber = (button) => {
    if(displayValue === '' || displayValue === '0' || resetDisplay) {
        displayValue = button.innerText;
        updateDisplay();
        resetDisplay = false;
    } else {
        displayValue += button.innerText;
        updateDisplay();
    }
}

const inputOperator = (button) => {
    if(firstNumber === undefined) {
        firstNumber = parseFloat(displayValue);
    } else {
        secondNumber = parseFloat(displayValue);
        displayValue = operate(firstNumber, secondNumber, operator);
        updateDisplay();
        firstNumber = parseFloat(displayValue);
    }

    operator = button.innerText;
    resetDisplay = true;
    // Add some button effect here
}

// Number button listeners
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputNumber(button);
    });
});

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