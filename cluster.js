/* eslint-disable global-require */
// Include the cluster module
const cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {
  // Count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', (worker) => {
    // Replace the dead worker, we're not sentimental
    // eslint-disable-next-line no-console
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });

  // Code to run if we're in a worker process
} else {
  // eslint-disable-next-line no-unused-vars
  const app = require('./src/index');
}

