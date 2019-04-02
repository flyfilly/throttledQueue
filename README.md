# Throttled Queue

Throttled Queue is a simple node library that affords a "throttle-able" queue which can be actioned through it's emitted events.

```javascript
//Require the library
const ThrottledQueue = require("./throttledQueue");

//Initialize the queue with the desired delay
const queue = new ThrottledQueue(1000);

//Example event for when an item is added to the queue
queue.on("addedItem", () => {
  queue.process();
});

//Example event for when an item from the queue is removed
queue.on("removedItem", async item => {
  try {
    /* ... Do something with the Item ... */
  } catch (error) {
    console.error(error);
  }
});
```

## Functions

#### queue.add(item)

Adds a single item or an array of items to the queue. The array will be processed in the order the array was sorted prior to adding to the queue.

#### queue.take()

Takes the next item from the queue to be processed. Note: Once the item is taken, it is removed from the queue.

#### queue.process()

Cyclically takes an item from the queue to be processed at the interval specified during instantiation.

#### queue.start()

Starts the queue processing cycle.

#### queue.stop()

Ends or pauses the queue processing cycle.

## Events

#### itemAdded

Event emitted when an item is added to the queue.

#### itemToProcess

Event emitted when an item is removed from the queue during processing.

#### itemRemoved

Event emitted when an item is removed from the queue.

#### itemsGone

Event emitted when the queue has no more items to be processed.
