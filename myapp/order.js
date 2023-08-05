const EventEmitter = require('events');


class OrderProcessor extends EventEmitter {

  processOrder(order) {

    // Simulate order processing time (1 second)

    setTimeout(() => {

      console.log(`Order ID ${order.id} processed successfully.`);

      this.emit('orderProcessed', order);

    }, 1000);

  }

}


module.exports = OrderProcessor;