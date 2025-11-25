const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("logistech.db");
// The Auditor

db.serialize(() => {
  db.run(`
    create table if not exists shipment_logs (
      tracking_id text,
      bin_id integer,
      truck_id text,
      timestamp datetime,
      status text
    )
  `);
});

function logShipment(trackingId, binId, truckId, status) {
  const timestamp = new Date().toISOString();
  db.run(
    `insert into shipment_logs (tracking_id, bin_id, truck_id, timestamp, status) values (?, ?, ?, ?, ?)`,
    [trackingId, binId, truckId, timestamp, status],
    (err) => {
      if (err) console.error("DB Error:", err);
    }
  );
}

module.exports = { db, logShipment };
