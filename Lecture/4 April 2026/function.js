// basic 

function info(){
    console.log("This is a function");
}

// call the function
info();
info();

// function with parameters

function add(a,b){
    console.log(a+b);
}

add(2,3);
add(5,10);

// example 
function bill(price,gst){
    gst_amount = price * gst/100;
    total_amount = price + gst_amount;
    console.log("price is: ", price,'/-');
    console.log("GST is: ", gst,' %');
    console.log("GST is: ", gst_amount,'/-');
    console.log("Total amount is: ", total_amount,'/-');
    console.log("***********************");
}

bill(1000,18);
bill(500,5);
bill(2000,12);


// function with return type

x = 100
console.log(x);

function getValue(){
    return 100;
}

console.log(getValue());


// function with parameters and return type

function multiply(a,b){
    return a*b;
}

console.log(multiply(5,10)+190);


function get_number(number) {
        num = number*number;
        return num;
}

console.log(get_number(5));



// function with condition

function checkEvenOdd(num){
    if(num%2==0){
        return "Even";
    }
    else{
        return "Odd";
    }
}

console.log(checkEvenOdd(10));
console.log(checkEvenOdd(15));


function loop_print(start,end){
    console.log("Start: ", start);
    console.log("End: ", end);
    for(let i=start;i<=end;i++){
        console.log(i);
    }
    console.log("***********************");
}

loop_print(1,10);
loop_print(5,15);


