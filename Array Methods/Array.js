// create a array
course = ['C++','C','Python','Ruby','Nodejs']
console.log(course);
//push() and pop():

//push(): Adds one or more elements to the end of an array.
course.push('java');
console.log('after push data - ',course);
//pop(): Removes the last element from the end of an array.
item = course.pop();
console.log('after pop data - ',course);
console.log('after pop item - ',item);
//unshift() and shift():

  //  unshift(): Adds one or more elements to the beginning of an array.
  //data = ['Array','Variable','Operator'];
  course.unshift('Array','Variable','Operator');
  console.log("after unsift data : = ",course);
  //  shift(): Removes the first element from the beginning of an array.

remove_item = course.shift();
console.log("remove item from array item name : ",remove_item)
console.log("remove item from array : ",course)

//concat():
array1 = [1, 2, 3];
array2 = [4, 5, 6];
combinedArray = array1.concat(array2); // [1, 2, 3, 4, 5, 6]
console.log("after combined array = ",combinedArray);

//slice() 
numbers = [1, 2, 3, 4, 5];
slicedNumbers = numbers.slice(1, 4); // [2, 3, 4]
console.log(slicedNumbers)
//splice():
animals = ['cat', 'dog', 'elephant'];
animals.splice(1, 1, 'tiger', 'lion');
console.log(animals)

//forEach():

animals.forEach(item => console.log(item));

// map():

numbers = [1, 2, 3];
doubledNumbers = numbers.map(num => num * 2); // [2, 4, 6]
console.log(doubledNumbers)
