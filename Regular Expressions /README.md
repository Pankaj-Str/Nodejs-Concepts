# Regular expressions

Regular expressions (regex or regexp) are powerful tools for pattern matching and manipulation of strings in programming languages like Node.js. The `RegExp` object in Node.js allows you to work with regular expressions. Here's a brief overview of using regular expressions in Node.js:

1. **Creating a Regular Expression:**

You can create a regular expression using the `RegExp` constructor or by using a regular expression literal.

Using `RegExp` constructor:

```javascript
const pattern = new RegExp('pattern');
```

Using regular expression literal:

```javascript
const pattern = /pattern/;
```

2. **Basic Matching:**

You can use the `test()` method to check if a string matches a regular expression pattern.

```javascript
const pattern = /hello/;
const str = 'hello world';

if (pattern.test(str)) {
  console.log('Match found!');
} else {
  console.log('No match found.');
}
```

3. **Matching and Extracting:**

Regular expressions can also extract matched portions using capturing groups.

```javascript
const pattern = /(\d{2})-(\d{2})-(\d{4})/;
const dateStr = '07-25-2023';
const matches = pattern.exec(dateStr);

if (matches) {
  const [, day, month, year] = matches;
  console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
} else {
  console.log('No match found.');
}
```

4. **Replacing:**

You can replace parts of a string using the `replace()` method with a regular expression.

```javascript
const str = 'Node.js is awesome!';
const pattern = /awesome/;
const newStr = str.replace(pattern, 'fantastic');

console.log(newStr); // Output: "Node.js is fantastic!"
```

5. **Modifiers:**

Regular expressions can have modifiers that affect the matching behavior. Common modifiers include:

- `i`: Case-insensitive matching.
- `g`: Global matching (find all occurrences).
- `m`: Multi-line matching.

```javascript
const pattern = /example/gi;
const str = 'This is an Example, another Example';

const matches = str.match(pattern);
console.log(matches); // Output: [ 'Example', 'Example' ]
```

6. **Anchors and Boundaries:**

- `^`: Matches the start of a string or line.
- `$`: Matches the end of a string or line.
- `\b`: Matches a word boundary.

```javascript
const pattern = /\bexample\b/i;
const str = 'This is an example, not an EXAMPLE';

const matches = str.match(pattern);
console.log(matches); // Output: [ 'example' ]
```

7. **Character Classes and Quantifiers:**

Character classes and quantifiers allow you to match specific sets of characters and control repetition.

```javascript
const pattern = /\d+/g;
const str = 'The price is $50 for item 1, $25 for item 2';

const matches = str.match(pattern);
console.log(matches); // Output: [ '50', '1', '25', '2' ]
```

These are just some basic examples of using regular expressions in Node.js. Regular expressions are a vast topic, and you can explore more advanced features and techniques for complex pattern matching and manipulation. The MDN Web Docs provide a comprehensive guide on regular expressions: [Regular Expressions - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
