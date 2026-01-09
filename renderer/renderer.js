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
  formAddMeasurememtWrapper.style.display = "none";
};
const handleShowForm = function () {
  formAddMeasurememtWrapper.style.display = "block";
  btnCloseForm?.addEventListener("click", handleCloseForm);
};

const handleShowMeasurement = (e) => {
  showMeasurement(e, containerMeasurements, sectionAllMeasurements);
  measurementItem = document.querySelector(".measurement-item");
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

const handleHomeBtn = function () {
  allMeasurementsWrapper.classList.add("hide");
  sectionHome.classList.remove("hide");
};

const handleMeasurementBtn = function () {
  sectionHome.classList.add("hide");
  if (measurementItem) measurementItem.style.display = "none";
  containerMeasurements.style.display = "block";
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
