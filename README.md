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

- [x] Emits "itemAdded"
- [x] Returns item

#### queue.take()

Takes the next item from the queue to be processed. Note: Once the item is taken, it is removed from the queue.

- [x] Emits "itemRemoved" and "itemsGone" respectively
- [x] Returns the next item

#### queue.process()

Cyclically takes an item from the queue to be processed at the interval specified during instantiation.

- [x] Emits "itemToProcess"
- [x] Returns interval

#### queue.start()

Starts the queue processing cycle.

- [x] Returns "The queue is already running." or "the queue is now running." respectively

#### queue.stop()

Ends or pauses the queue processing cycle.

- [x] Returns "The queue is not currrently running." or "the queue is now stopped." respectively

## Events

#### itemAdded

Event emitted when an item is added to the queue.

#### itemToProcess

Event emitted when an item is removed from the queue during processing.

#### itemRemoved

Event emitted when an item is removed from the queue.

#### itemsGone

Event emitted when the queue has no more items to be processed.
