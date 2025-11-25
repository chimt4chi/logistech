# 📦 **LogisTech – Warehouse Orchestration System**

LogisTech is a modular, scalable warehouse orchestration engine built in **Node.js**, designed to simulate real-world warehouse operations including package intake, smart bin allocation, backtracking-based truck loading, SQL logging, and centralized workflow control.

---

## 🚀 **Features**

### **1. Centralized Singleton Controller**

* `LogiMaster` manages all warehouse operations.
* Ensures only one instance controls bins, conveyor, truck loading, and logging.

### **2. Smart Data Structures**

| Feature       | Data Structure | Purpose                              |
| ------------- | -------------- | ------------------------------------ |
| Conveyor belt | **FIFO Queue** | Incoming package order               |
| Truck loading | **LIFO Stack** | Last-in-first-out loading + rollback |

---

## 🔍 **Algorithms Included**

### **1. Binary Search Best-Fit (O(log N))**

* Bins sorted by capacity.
* Finds the *smallest bin* with `capacity >= package.size`.

### **2. Backtracking Subset Fit**

* Given truck capacity + packages.
* Finds all valid combinations that fit.
* Includes rollback when over capacity.

---

## 🗄️ **SQLite Persistence**

Table: `shipment_logs`

| Column      | Type | Description     |
| ----------- | ---- | --------------- |
| tracking_id | TEXT | Package ID      |
| bin_id      | TEXT | Assigned bin    |
| truck_id    | TEXT | Loaded truck    |
| timestamp   | TEXT | UTC timestamp   |
| status      | TEXT | Workflow status |

All DB inserts use try/catch for safety.

---

## 🧩 **Core Components**

### **Models**

* `Package`
* `StorageUnit` (abstract)
* `StorageBin`
* `Truck`

### **Algorithms**

* `bestFitBin.js`
* `backtrackingFit.js`

### **Controller**

* `LogiMaster.js` (Singleton)

### **Database**

* `db.js` (SQLite auto-init)
* `logShipment()` helper

---

## 📁 **Project Structure**

```
logistech/
│
├── models/
│   ├── Package.js
│   ├── StorageUnit.js
│   ├── StorageBin.js
│   └── Truck.js
│
├── algorithms/
│   ├── bestFitBin.js
│   └── backtrackingFit.js
│
├── controller/
│   └── LogiMaster.js
│
├── database/
│   ├── db.js
│   └── shipmentLogger.js
│
├── index.js
└── readme.md
```

---

## ▶️ **Running the Project**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Run Demo**

```bash
node index.js
```

### **3. View SQLite Data**

Database file is auto-created in project root:

```
logitech.db
```
---


## 📘 Example Usage

```js
import LogiMaster from "./controller/LogiMaster.js";

const logis = LogiMaster.getInstance();
logis.loadBins([...]);
logis.enqueuePackage(new Package("P1001", 12));
logis.assignNextPackage();
logis.loadTruck();
```

---

## 🛠️ **Technologies Used**

* **Node.js**
* **SQLite3**
* **ES Modules**
* **Factory + Singleton patterns**
* **Algorithmic workflows (Binary Search, Backtracking)**
