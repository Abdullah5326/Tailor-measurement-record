import { showAlert } from "./alert.js";
import { modifyFormData } from "./utils.js";

export const addMeasurement = async function (data) {
  const result = await window.api.addMeasurement(data);
  return result;
};

export const getMeasurements = async function () {
  const data = await window.api.getMeasurements();

  return data;
};

export const getMeasurement = async function (id) {
  const measurement = await window.api.getMeasurement(id);

  return measurement;
};

export const deleteMeasurement = async function (id) {
  const result = await window.api.deleteMeasurement(id);
};
