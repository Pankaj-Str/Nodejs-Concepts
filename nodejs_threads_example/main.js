// main.js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // This code runs in the main thread.
  const worker = new Worker(__filename, {
    workerData: { data: 'Hello from the main thread!' }
  });

  worker.on('message', (message) => {
    console.log(`Received from worker: ${message}`);
  });

  worker.postMessage('Hello from the main thread!');
} else {
  // This code runs in the worker thread.
  parentPort.on('message', (message) => {
    console.log(`Received from main thread: ${message}`);

    // Simulate some heavy computation.
    for (let i = 0; i < 1000000000; i++) {}

    parentPort.postMessage('Hello from the worker thread!');
  });
}
