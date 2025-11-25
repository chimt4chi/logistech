const StorageUnit = require("./StorageUnit");

// Class: StorageBin (inherits StorageUnit)
class StorageBin extends StorageUnit {
  constructor(binId, capacity, locationCode) {
    super();
    this.binId = binId;
    this.capacity = capacity;
    this.locationCode = locationCode;
    this.used = 0;
  }

  occupySpace(amount) {
    if (this.used + amount <= this.capacity) {
      this.used += amount;
      return true;
    }
    return false;
  }

  freeSpace() {
    return this.capacity - this.used;
  }

  // Sorting by capacity for binary search
  static compare(a, b) {
    return a.capacity - b.capacity;
  }
}

module.exports = StorageBin;
