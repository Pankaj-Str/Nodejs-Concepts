# Node.js Events


## 1. What is an Event in Node.js?

An event is an action or occurrence that a program can respond to.

For example:

- A user clicks a button.
- A student registers for a course.
- An order is placed.
- A file finishes downloading.
- A server receives a request.

Node.js uses the built-in `EventEmitter` class to create and handle custom events.

Real-life example: Imagine a school bell rings. The bell is the event, and students respond to it.

Event occurs

School bell rings

Event Listener

Waits for the bell to ring

Event Handler

Students go to class

## 2. Install Node.js

If Node.js is already installed, skip this step.

1. Open the official website: [Download Node.js](https://nodejs.org/).
2. Download the recommended LTS version.
3. Install Node.js on your computer.
4. Open the terminal in VS Code.

Check whether Node.js is installed:

```
node -v
```

Check npm:

```
npm -v
```

Both commands should display version numbers.

## 3. Create Your First Node.js Project

Step 1: Create a folder named `node-events`.

Step 2: Open this folder in VS Code.

Step 3: Create a file named `app.js`.

Your project structure:

```
node-events/
└── app.js
```

## 4. Your First Event Example

Let's create a simple event that displays a message when triggered.

Write this complete code in `app.js`:

```

const EventEmitter = require('events');

// Step 1: Create an EventEmitter object
const event = new EventEmitter();

// Step 2: Create an event listener
event.on('greet', function () {
    console.log('Hello! Welcome to Node.js Events.');
});

// Step 3: Trigger the event
event.emit('greet');

```

### Run the program

Open the terminal and execute:

```
node app.js
```

Output:

```
Hello! Welcome to Node.js Events.
```

### Understand every line

| Code                 | Explanation                               |
| -------------------- | ----------------------------------------- |
| `require('events')`  | Imports Node.js's built-in events module. |
| `new EventEmitter()` | Creates an event emitter object.          |
| `event.on()`         | Registers a listener for an event.        |
| `'greet'`            | The name of our custom event.             |
| `event.emit()`       | Triggers the event.                       |

Important: Register the listener before triggering the event. Otherwise, the listener may miss the event.

## 5. Example: Student Registration Event

Now let's use a real-life example. Whenever a student registers for a course, we will display a confirmation message.

```

const EventEmitter = require('events');

const event = new EventEmitter();

// Listen for the studentRegistered event
event.on('studentRegistered', function (studentName) {
    console.log('Student registered successfully!');
    console.log('Student Name:', studentName);
});

// Trigger the event and pass student data
event.emit('studentRegistered', 'Rahul');
event.emit('studentRegistered', 'Priya');

```

Output:

```
Student registered successfully!
Student Name: Rahul
Student registered successfully!
Student Name: Priya
```

Here, `studentRegistered` is the event name, and `Rahul` and `Priya` are the values passed to the listener.

## 6. Example: Pass Multiple Values to an Event

You can pass multiple arguments to an event listener.

```

const EventEmitter = require('events');

const event = new EventEmitter();

event.on('courseDetails', function (name, course, fee) {
    console.log('Student:', name);
    console.log('Course:', course);
    console.log('Fee:', fee);
});

event.emit('courseDetails', 'Rahul', 'Python', 5000);

```

Output:

```
Student: Rahul
Course: Python
Fee: 5000
```

How does it work?

The arguments passed to `emit()` are received by the listener function in the same order.

- First argument: `name`
- Second argument: `course`
- Third argument: `fee`

## 7. Difference Between `on()` and `once()`

Node.js provides two useful methods for registering event listeners.

| Method   | Meaning                                                       |
| -------- | ------------------------------------------------------------- |
| `on()`   | Runs the listener every time the event is triggered.          |
| `once()` | Runs the listener only the first time the event is triggered. |

Example:

```

const EventEmitter = require('events');

const event = new EventEmitter();

event.on('normalEvent', () => {
    console.log('Normal event executed');
});

event.once('singleEvent', () => {
    console.log('This message appears only once');
});

event.emit('normalEvent');
event.emit('normalEvent');

event.emit('singleEvent');
event.emit('singleEvent');

```

Output:

```
Normal event executed
Normal event executed
This message appears only once
```

Notice that `normalEvent` runs twice, but `singleEvent` runs only once.

## 8. Example: Remove an Event Listener

Sometimes you need to stop listening for an event. You can use `off()` to remove a specific listener.

```

const EventEmitter = require('events');

const event = new EventEmitter();

function welcome() {
    console.log('Welcome to Node.js!');
}

event.on('welcomeEvent', welcome);

// First trigger
event.emit('welcomeEvent');

// Remove the listener
event.off('welcomeEvent', welcome);

// Second trigger
event.emit('welcomeEvent');

```

Output:

```
Welcome to Node.js!
```

The second event does not display anything because the listener has been removed.

Note: `off()` removes the exact listener function registered with `on()`.

## 9. Example: Event with an Object

In real applications, you often work with objects instead of separate values.

```

const EventEmitter = require('events');

const event = new EventEmitter();

event.on('orderPlaced', (order) => {
    console.log('New Order Received');
    console.log('Order ID:', order.id);
    console.log('Product:', order.product);
    console.log('Price:', order.price);
});

const orderDetails = {
    id: 101,
    product: 'Laptop',
    price: 45000
};

event.emit('orderPlaced', orderDetails);

```

Output:

```
New Order Received
Order ID: 101
Product: Laptop
Price: 45000
```

This pattern is useful in e-commerce applications, notification systems, and other Node.js projects.

## 10. Practice Exercise

Try this beginner exercise yourself.

## Create a Course Enrollment Event

Enter student details and generate the expected event output.

Student name

Course name

Java

Python

SQL

Course fee (₹)

Generate Complete Code

## 11. Quick Revision

- `EventEmitter` creates and manages custom events.
- `on()` registers a listener.
- `emit()` triggers an event.
- `once()` registers a listener that runs only once.
- `off()` removes a listener.
- Events can carry strings, numbers, and objects as data.

