const StorageUnit = require("./StorageUnit");

class Truck extends StorageUnit {
  constructor(truckId, capacity) {
    super();
    this.truckId = truckId;
    this.capacity = capacity;
    this.used = 0;
    this.stack = [];
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

  pushPackage(pkg) {
    if (this.occupySpace(pkg.size)) {
      this.stack.push(pkg);
      return true;
    }
    return false;
  }

  popPackage() {
    if (this.stack.length === 0) return null;
    const pkg = this.stack.pop();
    this.used -= pkg.size;
    return pkg;
  }

  rollbackLoad(n) {
    const popped = [];
    for (let i = 0; i < n; i++) {
      const pkg = this.popPackage();
      if (!pkg) break;
      popped.push(pkg);
    }
    return popped;
  }
}

module.exports = Truck;
