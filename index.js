const LogiMaster = require("./LogisMaster.js");
const Package = require("./models/Package");
const StorageBin = require("./models/StorageBin");
const Truck = require("./models/Truck");

// Get singleton
const master = LogiMaster.getInstance();

// Load bins (unsorted)
master.loadBins([
  new StorageBin(1, 5, "A1"),
  new StorageBin(2, 50, "B2"),
  new StorageBin(3, 10, "A2"),
  new StorageBin(4, 15, "C1"),
]);

// Push packages to conveyor
master.pushToConveyor(new Package("PKG001", 12, "ZoneX"));
master.pushToConveyor(new Package("PKG002", 4, "ZoneY"));
master.pushToConveyor(new Package("PKG003", 50, "ZoneZ"));

// Process FIFO
let pkg;
while ((pkg = master.processNextPackage())) {
  const assigned = master.assignBin(pkg);
  console.log(
    `Package ${pkg.trackingId} stored in bin:`,
    assigned?.binId || "NO BIN"
  );
}

// Truck demo
const truck = new Truck("TRUCK-1", 30);

const fragile = [
  new Package("F1", 10, "A"),
  new Package("F2", 12, "A"),
  new Package("F3", 9, "A"),
];

const chosen = master.findFitForTruck(fragile, truck);
console.log(
  "Backtracking selected:",
  chosen?.map((p) => p.trackingId)
);

if (chosen) {
  const ok = master.loadPackagesOntoTruck(truck, chosen);
  console.log("Loaded:", ok, "Truck used:", truck.used);
}
