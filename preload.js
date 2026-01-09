const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  addMeasurement: (data) => ipcRenderer.invoke("addMeasurement", data),
  getMeasurements: () => ipcRenderer.invoke("get-measurements"),
  getMeasurement: (id) => ipcRenderer.invoke("get-measurement", id),
  // we can also expose variables, not just functions
});
