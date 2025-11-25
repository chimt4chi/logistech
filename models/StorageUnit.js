// Abstract Class: StorageUnit
class StorageUnit {
  occupySpace(amount) {
    throw new Error("Not implemented");
  }

  freeSpace() {
    throw new Error("Not implemented");
  }
}

module.exports = StorageUnit;
