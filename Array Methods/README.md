
# Built-in methods for manipulating arrays

These methods are part of the JavaScript language and can be used to perform common tasks such as adding, removing, and modifying elements in an array. Here's an overview of some commonly used array methods in Node.js:

1. **`push()` and `pop()`:**

   - `push()`: Adds one or more elements to the end of an array.
   - `pop()`: Removes the last element from the end of an array.

   ```javascript
   const fruits = ['apple', 'banana'];
   fruits.push('orange'); // ['apple', 'banana', 'orange']
   const removedFruit = fruits.pop(); // 'orange'
   ```

2. **`unshift()` and `shift()`:**

   - `unshift()`: Adds one or more elements to the beginning of an array.
   - `shift()`: Removes the first element from the beginning of an array.

   ```javascript
   const colors = ['red', 'blue'];
   colors.unshift('green'); // ['green', 'red', 'blue']
   const removedColor = colors.shift(); // 'green'
   ```

3. **`concat()`:**

   Combines two or more arrays, returning a new array without modifying the original arrays.

   ```javascript
   const array1 = [1, 2, 3];
   const array2 = [4, 5, 6];
   const combinedArray = array1.concat(array2); // [1, 2, 3, 4, 5, 6]
   ```

4. **`slice()`:**

   Creates a shallow copy of a portion of an array into a new array.

   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   const slicedNumbers = numbers.slice(1, 4); // [2, 3, 4]
   ```

5. **`splice()`:**

   Adds or removes elements from an array at a specified index.

   ```javascript
   const animals = ['cat', 'dog', 'elephant'];
   animals.splice(1, 1, 'tiger', 'lion'); // ['cat', 'tiger', 'lion', 'elephant']
   ```

6. **`forEach()`:**

   Iterates through an array and applies a provided function to each element.

   ```javascript
   const numbers = [1, 2, 3];
   numbers.forEach(num => console.log(num * 2));
   ```

7. **`map()`:**

   Creates a new array by applying a provided function to each element of the original array.

   ```javascript
   const numbers = [1, 2, 3];
   const doubledNumbers = numbers.map(num => num * 2); // [2, 4, 6]
   ```

8. **`filter()`:**

   Creates a new array containing elements from the original array that satisfy a given condition.

   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   const evenNumbers = numbers.filter(num => num % 2 === 0); // [2, 4]
   ```

9. **`find()`:**

   Returns the first element in the array that satisfies a given condition.

   ```javascript
   const people = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
   const person = people.find(p => p.age === 30); // { name: 'Bob', age: 30 }
   ```

10. **`reduce()`:**

    Applies a function to reduce the array to a single value, accumulating the result.

    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15
    ```

These are just some of the many array methods available in Node.js. Each method serves a specific purpose and can greatly simplify your code when working with arrays.
