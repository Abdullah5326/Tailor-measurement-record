import {
  addMeasurement,
  showMeasurement,
  showAllMeasurements,
} from "./measurement.js";

//DOM Elements
const btnCloseForm = document.querySelector(".btn-form-close");
const btnAddMeasurment = document.querySelector(".btn-add-measurement");
const btnSeeAllMeasurments = document.querySelector(".btn-see-measurements");
const btnHome = document.querySelector(".btn-home");
const btnMeasurements = document.querySelector(".btn-measurements");
const operationMenuDots = document.querySelector(".operation-menu-dots");
const operationMenu = document.querySelector(".operation-menu");
const sectionHome = document.querySelector(".home");
const sectionAllMeasurements = document.querySelector(".all-measurements");
const formAddMeasurment = document.querySelector(".form-add-measurement");
const formAddMeasurememtWrapper = document.querySelector(".form-wrapper");
const containerMeasurements = document.querySelector(".measurements");
const allMeasurementList = document.querySelector(".measurement-list");
const allMeasurementsWrapper = document.querySelector(
  ".all-measurements-wrapper"
);
let allMeasurementsContainer, measurementItem;

//Handler
const handleCloseForm = function () {
  formAddMeasurememtWrapper.classList.add("hide");
};
const handleShowForm = function () {
  formAddMeasurememtWrapper.classList.remove("hide");
  btnCloseForm?.addEventListener("click", handleCloseForm);
};

const handleShowMeasurement = async (e) => {
  await showMeasurement(e, containerMeasurements, sectionAllMeasurements);
  measurementItem = document.querySelector(".measurement-item");

  const operationMenuDots = document.querySelector(".operation-menu-dots");

  operationMenuDots.addEventListener("click", handleOperationMenu);
};

const handleShowAllMeasuremnts = async () => {
  await showAllMeasurements(
    sectionHome,
    allMeasurementList,
    allMeasurementsWrapper
  );

  const measurementItems = [...document.querySelectorAll(".list-item")];

  if (measurementItems)
    measurementItems.forEach((el) =>
      el.addEventListener("click", handleShowMeasurement)
    );
};

const handleAddMeasuremnt = function (e) {
  e.preventDefault();
  addMeasurement(e, formAddMeasurememtWrapper);
};

const handleEditMeasurement = function (e) {};

const handleDeleteMeasurement = async function (id) {
  const result = await window.api.deleteMeasurement(id);

  console.log(result);

  if (result.changes) {
    sectionHome.classList.add("hide");
    sectionAllMeasurements.removeChild(measurementItem);
    measurementItem = undefined;
    containerMeasurements.classList.remove("hide");
    allMeasurementList.classList.remove("hide");
    handleShowAllMeasuremnts();
  }
};

const handleOperationMenu = function (e) {
  const operationMenu = document.querySelector(".operation-menu");
  operationMenu.classList.toggle("hide");

  const id = e.currentTarget.dataset.measurementItemId;
  const btnEdit = document.querySelector(".btn-edit");
  const btnDelete = document.querySelector(".btn-delete");

  btnEdit.addEventListener("click", handleEditMeasurement);

  btnDelete.addEventListener("click", () => handleDeleteMeasurement(id));
};

const handleHomeBtn = function () {
  console.log(measurementItem);
  console.log(Boolean(measurementItem));
  if (measurementItem) {
    sectionAllMeasurements.removeChild(measurementItem);
    measurementItem = undefined;
  }

  containerMeasurements.classList.remove("hide");
  allMeasurementList.textContent = "";
  allMeasurementsWrapper.classList.add("hide");
  sectionHome.classList.remove("hide");
};

const handleMeasurementBtn = function () {
  console.log(measurementItem);
  sectionHome.classList.add("hide");
  if (measurementItem) {
    sectionAllMeasurements.removeChild(measurementItem);
    measurementItem = undefined;
  }
  containerMeasurements.classList.remove("hide");
  allMeasurementList.classList.remove("hide");
};

//Event Listeners
if (btnAddMeasurment)
  btnAddMeasurment.addEventListener("click", handleShowForm);

if (formAddMeasurment)
  formAddMeasurment.addEventListener("submit", handleAddMeasuremnt);

if (btnSeeAllMeasurments)
  btnSeeAllMeasurments.addEventListener("click", handleShowAllMeasuremnts);

if (btnHome) btnHome.addEventListener("click", handleHomeBtn);

if (btnMeasurements)
  btnMeasurements.addEventListener("click", handleMeasurementBtn);
