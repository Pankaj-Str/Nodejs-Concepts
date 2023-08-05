const OrderProcessor = require('./order');


// Create an instance of OrderProcessor

const orderProcessor = new OrderProcessor();


// Register an event listener for the 'orderProcessed' event

orderProcessor.on('orderProcessed', (order) => {

  console.log(`Received confirmation for Order ID ${order.id}.`);

});


// Process an order

const order = { id: 123, amount: 50 };

orderProcessor.processOrder(order);