const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

require("electron-reload")(__dirname);

let db;

function createDatabase() {
  const Database = require("better-sqlite3");

  const dbPath = path.join(app.getPath("userData"), "tailors-records.db");
  db = new Database(dbPath);

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
  
      name TEXT NOT NULL,
      returnDate TEXT NOT NULL,
      price REAL NOT NULL,
      createdAt TEXT,
      numOfSuits INTEGER DEFAULT 1,
  
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
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "assets/icon.png"),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "client/views/index.html"));

  // REQUIRED when show:false
  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createDatabase();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ================= IPC ================= */

ipcMain.handle("addMeasurement", (event, data) => {
  const stmt = db.prepare(`
  INSERT INTO measurements (
    name, returnDate, price, createdAt, numOfSuits, length, width, shoulder, collar, chest, fitness,
    shalwar, pancha, sleeve, sleeveSimple, cuff, sidePockets,banRounded, lahinRounded, frontPocket, silkThread, stylishButtons, stylishSuit, shalwarPocket, isCollar
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)
`);

  stmt.run(
    data.name,
    data.returnDate,
    data.price,
    data.createdAt,
    data.numOfSuits,
    data.length,
    data.width,
    data.shoulder,
    data.collar,
    data.chest,
    data.fitness,
    data.shalwar,
    data.pancha,
    data.sleeve,
    data.sleeveSimple,
    data.cuff,
    data.sidePockets,
    data.banRounded || 0,
    data.lahinRounded || 0,
    data.frontPocket || 0,
    data.silkThread || 0,
    data.stylishButtons || 0,
    data.stylishSuit || 0,
    data.shalwarPocket || 0,
    data.isCollar || 0
  );

  return { success: true };
});

ipcMain.handle("get-measurements", () => {
  return db.prepare(`SELECT * FROM measurements`).all();
});

ipcMain.handle("get-measurement", (event, id) => {
  return db.prepare(`SELECT * FROM measurements WHERE id = ?`).get(id);
});

ipcMain.handle("delete-measurement", (event, id) => {
  const result = db.prepare(`DELETE FROM measurements WHERE id = ?`).run(id);

  return result;
});

ipcMain.handle("update-measurement", (event, id, data) => {
  const stmt = db.prepare(`
  UPDATE measurements
  SET
    name = @name,
    returnDate = @returnDate,
    price = @price,
    createdAt = @createdAt,
    numOfSuits = @numOfSuits,
    length = @length,
    width = @width,
    shoulder = @shoulder,
    collar = @collar,
    chest = @chest,
    fitness = @fitness,
    shalwar = @shalwar,
    pancha = @pancha,
    sleeve = @sleeve,
    sleeveSimple = @sleeveSimple,
    cuff = @cuff,
    sidePockets = @sidePockets,
    banRounded = @banRounded,
    lahinRounded = @lahinRounded,
    frontPocket = @frontPocket,
    silkThread = @silkThread,
    stylishButtons = @stylishButtons,
    stylishSuit = @stylishSuit,
    shalwarPocket = @shalwarPocket,
    isCollar = @isCollar
  WHERE id = @id
`);

  return stmt.run({
    id,
    name: data.name,
    returnDate: data.returnDate,
    price: data.price,
    createdAt: data.createdAt,
    numOfSuits: data.numOfSuits,
    length: data.length,
    width: data.width,
    shoulder: data.shoulder,
    collar: data.collar,
    chest: data.chest,
    fitness: data.fitness,
    shalwar: data.shalwar,
    pancha: data.pancha,
    sleeve: data.sleeve,
    sleeveSimple: data.sleeveSimple,
    cuff: data.cuff,
    sidePockets: data.sidePockets,
    banRounded: data.banRounded || 0,
    lahinRounded: data.lahinRounded || 0,
    frontPocket: data.frontPocket || 0,
    silkThread: data.silkThread || 0,
    stylishButtons: data.stylishButtons || 0,
    stylishSuit: data.stylishSuit || 0,
    shalwarPocket: data.shalwarPocket || 0,
    isCollar: data.isCollar || 0,
  });
});
