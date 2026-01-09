const { app } = require("electron");
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(app.getPath("userData"), "tailors.db");

const db = new Database(dbPath);
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS measurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    returnDate TEXT NOT NULL,
    price REAL NOT NULL,
    createdAt TEXT,

    length REAL NOT NULL,
    width REAL NOT NULL,
    shoulder REAL NOT NULL,
    collar REAL NOT NULL,
    chest REAL NOT NULL,
    fitness REAL NOT NULL,

    shalwar REAL NOT NULL,
    pancha REAL NOT NULL,

    sleeve REAL NOT NULL,
    sleeveSimple REAL NOT NULL,
    cuff REAL NOT NULL,
    sidePockets REAL NOT NULL,

    isCollar INTEGER DEFAULT 0,
    banRounded INTEGER DEFAULT 0,
    lahinRounded INTEGER DEFAULT 0,
    frontPocket INTEGER DEFAULT 0,
    silkThread INTEGER DEFAULT 0,
    stylishButtons INTEGER DEFAULT 0,
    stylishSuit INTEGER DEFAULT 0,
    shalwarPocket INTEGER DEFAULT 0
  )
`
).run();

module.exports = db;
