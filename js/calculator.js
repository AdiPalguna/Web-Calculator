// Object calculator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

// Fungsi update angka pada display
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Fungsi menghapus angka pada display
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// Input angka
function InputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    }
    else {
        calculator.displayNumber += digit;
    }
}

// Mendapatkan nilai seluruh elemen button
const buttons = document.querySelectorAll(".button");

for (let button of buttons) {
    button.addEventListener('click', function(event) {
        // Mendapatkan objek elemen yang di klik
        const target = event.target;
        
        // event.classList untuk melihat nilai class pada element target
        // Method .contains untuk memastikan nilai yang terkandung
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        InputDigit(target.innerText);
        updateDisplay()
    });
}

// Fungsi inverseNumber() untuk angka negatif
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// Fungsi untuk tombol operator
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // Mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }
    else {
        alert("Operator sudah ditetapkan")
    }
}

// Fungsi untuk kalkulasi nilai-nilai
function performCalculator() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {

        // parseInt() untuk mengubah nilai string menjadi number
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }
    else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}