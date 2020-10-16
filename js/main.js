let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let decimalBtn = document.getElementById('decimal');
let clearBtns = document.querySelectorAll('.clear-btn');
let resultBtn = document.getElementById('result');
let display = document.getElementById('inputDisplay')
let sqrtBtn = document.getElementById('sqrt');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
let FirstNumber = true;
let FirstSqrt = true;//
let checkError = false;


for(let i=0;i<numbers.length;i++){
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        console.log(e);
        numberPress(e.target.textContent.trim());
    });
}

for(let i=0;i<operations.length;i++){
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        operation(e.target.textContent.trim());
    });
}

for(let i=0;i<clearBtns.length;i++){
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e){
        clear(e.srcElement.id);
    });
}


decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

function numberPress(number){
    if (checkError === true){
        checkError = false;
    }
    if(memoryNewNumber){
        display.value = number;
        memoryNewNumber = false;
        FirstSqrt = false;//
    } else{
        if(display.value === '0'){
            display.value = number;
            FirstNumber = false;
            FirstSqrt = false;//
        } else{
            display.value += number;
            FirstNumber = false;
            FirstSqrt = false;//
        }
    }
};

function operation(op){
    let localOperationMemory = display.value;
    // Проверка на минус
    if (checkError === true){
        display.value = "Error input";
    } else 
    if((memoryPendingOperation === '*' || memoryPendingOperation === '+' || memoryPendingOperation === '/' || memoryPendingOperation === '-') && op === '-'){
        display.value = op;
        memoryNewNumber = false;
    } else if(memoryNewNumber && memoryPendingOperation !== '='){
        display.value = memoryCurrentNumber;
    } else{
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
        } else if(memoryPendingOperation === '-'){
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if(memoryPendingOperation === '*'){
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if(memoryPendingOperation ==='/'){
            memoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if(memoryPendingOperation === '**'){
            memoryCurrentNumber = Math.pow(memoryCurrentNumber, localOperationMemory);
        } else if(op === '/*'){
            if (localOperationMemory < 0){
                checkError = true;
            }
            memoryCurrentNumber = Math.sqrt(localOperationMemory);
            memoryNewNumber = false;
        } else if(memoryPendingOperation === '/*' && FirstSqrt === true){
            memoryCurrentNumber = Math.sqrt(localOperationMemory);
        }
         else {
            memoryCurrentNumber = parseFloat(localOperationMemory);

        };


        if(FirstNumber === true && op === '-'){
            display.value = op;
            memoryNewNumber = false;
            FirstNumber === false;
        }else if(checkError){
            display.value = 'Error';
        }
        else {
            display.value = +memoryCurrentNumber.toFixed(4);
            memoryPendingOperation = op;
            console.log(n);
        };

        
   }
};

function decimal(){
    let localDecimalMemory = display.value;
    if(memoryNewNumber){
        localDecimalMemory ='0.';
        memoryNewNumber = false;
    } else{
        if(localDecimalMemory.indexOf('.') === -1){
            localDecimalMemory +='.';
        };
    };
    display.value = localDecimalMemory;
    if (checkError === true){
        display.value = "Error input";
    } 
};

function clear(id){
    if(id === 'ce'){
        display.value = '0';
        memoryNewNumber = true;
    }else if (id === 'c'){
        display.value = '0';
        memoryNewNumber = false;
        memoryCurrentNumber = 0;
        memoryPendingOperation = '';
        FirstNumber = true;
    };
};



