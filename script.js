

/**accumulators  input data from user*/


// first operand
let firstOperand = null;

// second operand
let secondOperand = null;

// operator
let operator = null;

// text to be displyed
let message = "";

// dot
let isMultipleDot = false;




// addition
function add(firstOperand,secondOperand){
    return firstOperand + secondOperand;
};


// substraction

function subtract(firstOperand ,secondOperand){
    return firstOperand - secondOperand;
}


// multiplication

function multiply(firstOperand ,secondOperand){
    return firstOperand * secondOperand;
}


// division
function divide(firstOperand , secondOperand){
    return firstOperand / secondOperand;
}


// handle equal button
function operate(){
    console.log(operator)

   

        let operand1 = Number(firstOperand);
        let operand2 = Number(secondOperand);
        let result = '';

        if(operator === "+"){
            result = add(operand1,operand2); 

        }

        else if(operator === "-"){
            result = subtract(operand1,operand2);


        }

        else if(operator === "*"){
            result = multiply(operand1,operand2);

        }

        else if(operator === "/"){
            // divsion by zero
            if(operand2 === 0){
                
                clearAll();
                return;
            }
            result = divide(operand1,operand2);

        }


        message = result.toString()
        firstOperand = result.toString();
        secondOperand = null;
        operator = null;  
        if (firstOperand.includes(".")) isMultipleDot = true; 
        else{
            isMultipleDot = false; 
        }
         
    
}

// operand setter
function setOperands(value){
    if(value === "."){
        isMultipleDot = true;
    }
    
    if(message === "0" && value !='.'){
        message = '';
        setMessage ();

    }

    if(operator){
        if(!secondOperand){
            secondOperand = value;

        }
        else{
            secondOperand += value;

        }

        message += value;
        setMessage();
    }
    else{
        if(!firstOperand){
            firstOperand = value;

        }
        else{
            firstOperand += value;

        }

        message += value;
        setMessage();
    }

}


// refresh the calculator

function clearAll(){
    message = '';
    firstOperand = null;
    operator = null;
    secondOperand = null;
    setMessage();
    isMultipleDot = false;

} 

// removes newly entered input
function clearOne(){





    if(message.length > 0){

        if(secondOperand && secondOperand.length > 0){

            if(secondOperand[secondOperand.length - 1] === ".") isMultipleDot = false;

            let newOp2 = secondOperand.slice(0, -1);
            secondOperand = newOp2;
            if(secondOperand.length===0) {
                
                secondOperand = null;
                if (firstOperand.includes(".")) isMultipleDot = true; 
            }
        }

        else if( operator ) operator = null;

        else if (firstOperand && firstOperand.length > 0){

            if(firstOperand[firstOperand.length - 1] == ".") isMultipleDot = false;
            
            let newOp1 = firstOperand.slice(0, -1);
            firstOperand = newOp1;
            if(firstOperand.length===0) {
                
                firstOperand = null;
            }

        }
        

        let newStr = message.slice(0, -1);
        message = newStr;
        setMessage();
        console.log(newStr)
    }
    

    
}



const textAria = document.getElementById('inp-outp');

function setMessage (){
    textAria.innerHTML = message;
    console.log(message);
}

// digits listeners
const digits = document.querySelectorAll('.button');



 digits.forEach(element => {
    element.addEventListener('click',(e) => {
        //first zero
        // multiple zero
        if(e.target.value === '.' && isMultipleDot) return;
        
        setOperands(e.target.value);
        
        
    });
 });


// operators listeners
const operators = document.querySelectorAll('.o-button');

operators.forEach(element => {
    element.addEventListener('click',(e)=>{
        isMultipleDot = false;
        // to handle equal button
        if( e.target.value === "="){

            if(firstOperand && secondOperand && operator){
                operate();
                setMessage();
            }
            
        }


        else{
            // check whether frist operand entered before assigning oparator
            if(!operator  && firstOperand){
                operator = e.target.value;
                message += e.target.value;
                setMessage();

            }

            // handles the condition where a user wants to use 2 and above oparators
            
            else if(firstOperand && secondOperand && operator){
                operate();
                operator = e.target.value;
                message += e.target.value;
                setMessage();
            }
            
        }
        
    });
    
});






//reseters listeners
const C = document.getElementById('clearOne');

// back space

C.addEventListener('click',()=>{
 clearOne();
   
});


// clear all
const AC = document.getElementById('clearAll');
AC.addEventListener('click',()=>{
  clearAll()
});

