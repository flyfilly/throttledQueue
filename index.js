const events = require("events");

const ThrottledQueue = function(throttle = 1000) {
  this.queue = [];
  this.interval = null;
  this.throttle = throttle;
};

ThrottledQueue.prototype = new events.EventEmitter();

ThrottledQueue.prototype.add = function(item) {
  if (Array.isArray(item)) {
    this.queue = [...item, ...this.queue];
  } else {
    this.queue.unshift(item);
  }

  this.emit("itemAdded", item);
};

ThrottledQueue.prototype.take = function() {
  const item = this.queue.pop();
  this.emit("itemRemoved", item);

  if (0 === this.queue.length) {
    this.emit("itemsGone");
    this.stop();
  }

  return item;
};

ThrottledQueue.prototype.process = function() {
  if (!this.interval) {
    return (this.interval = setInterval(async () => {
      this.emit("itemToProcess", this.take());
    }, this.throttle));
  }

  return this.interval;
};

ThrottledQueue.prototype.start = function() {
  if (this.interval) {
    return "The queue is already running.";
  }

  this.process();
  return "the queue is now running.";
};

ThrottledQueue.prototype.stop = function() {
  if (!this.interval) {
    return "The queue is not currrently running.";
  }
  clearInterval(this.interval);
  this.interval = null;
  return "queue stopped.";
};

module.exports = ThrottledQueue;
