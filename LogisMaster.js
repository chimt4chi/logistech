const bestFitBin = require("./algorithms/bestFitBin");
const backtrackingFit = require("./algorithms/backtrackingFit");
const { logShipment } = require("./database/db");

class LogiMaster {
  constructor() {
    if (LogiMaster._instance) {
      // Singleton
      return LogiMaster._instance;
    }

    this.bins = [];
    this.conveyor = [];
    LogiMaster._instance = this;
  }

  static getInstance() {
    return new LogiMaster();
  }

  loadBins(binsArray) {
    this.bins = binsArray.sort((a, b) => a.capacity - b.capacity);
  }

  assignBin(pkg) {
    const bin = bestFitBin(this.bins, pkg.size);
    if (bin && bin.occupySpace(pkg.size)) {
      logShipment(pkg.trackingId, bin.binId, null, "STORED_IN_BIN");
      return bin;
    }
    return null;
  }

  // Queue
  pushToConveyor(pkg) {
    this.conveyor.push(pkg);
  }

  processNextPackage() {
    return this.conveyor.shift() || null;
  }

  // Truck Loading
  loadPackagesOntoTruck(truck, packages) {
    for (const pkg of packages) {
      if (!truck.pushPackage(pkg)) {
        truck.rollbackLoad(packages.length);
        return false;
      }
      logShipment(pkg.trackingId, null, truck.truckId, "LOADED_ON_TRUCK");
    }
    return true;
  }

  findFitForTruck(packages, truck) {
    return backtrackingFit(packages, truck.freeSpace());
  }
}

module.exports = LogiMaster;
