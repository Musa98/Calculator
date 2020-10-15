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

sqrtBtn.addEventListener('click', sqrt);


resultBtn.addEventListener('click', result);

function numberPress(number){
    if(memoryNewNumber){
        display.value = number;
        memoryNewNumber = false;
    } else{
        if(display.value === '0'){
            display.value = number;
        } else{
            display.value += number;
        }
    }
};

function operation(op){
    let localOperationMemory = display.value;

    if(memoryNewNumber && memoryPendingOperation !== '='){
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
            memoryCurrentNumber = Math.sqrt(localOperationMemory);
            memoryNewNumber = false;
            //display.value = memoryCurrentNumber;
        } else {
            memoryCurrentNumber = parseFloat(localOperationMemory);
        };



        display.value = memoryCurrentNumber;
        memoryPendingOperation = op;
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
};

function clear(id){
    if(id === 'ce'){
        display.value = '0';
        memoryNewNumber = true;
    }else if (id === 'c'){
        display.value = '0';
        memoryNewNumber = true;
        memoryCurrentNumber = 0;
        memoryPendingOperation = '';
    };
};

/*function sqrt(){
    let localDecimalMemory = display.value;
    let result = Math.sqrt(localDecimalMemory);
    display.value = result;
    memoryCurrentNumber = result;
}8?*/


