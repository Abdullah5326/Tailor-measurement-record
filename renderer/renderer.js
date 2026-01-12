import { showAlert } from "./alert.js";
import {
  addMeasurement,
  showMeasurement,
  showAllMeasurements,
} from "./measurement.js";
import { modifyFormData } from "./utils.js";

//DOM Elements
const bodyElement = document.body;
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

const fillForm = function (formData) {
  document.getElementById("name").value = formData.name || "Abdullah";
  document.getElementById("numOfSuits").value = formData.numOfSuits || 2;
  document.getElementById("price").value = formData.price || 2000;
  document.getElementById("return-date").value =
    formData.returnDate || "02/03/2007";
  document.getElementById("length").value = formData.length || 42;
  document.getElementById("width").value = formData.width || 21;
  document.getElementById("shoulder").value = formData.shoulder || 19;
  document.getElementById("collar").value = formData.collar || 15;
  document.getElementById("chest").value = formData.chest || 36;
  document.getElementById("fitness").value = formData.fitness || 21;
  document.getElementById("sleeve").value = formData.sleeve || 24;
  document.getElementById("shalwar").value = formData.shalwar || 42;
  document.getElementById("pancha").value = formData.pancha || 7;
  document.getElementById("sleeveSimple").value = formData.sleeveSimple || 6;
  document.getElementById("cuff").value = formData.cuff || 9;
  document.getElementById("sidePockets").value = formData.sidePockets || 2;

  document.getElementById("isCollar").checked = formData.isCollar;
  document.getElementById("banGol").checked = formData.banRounded || 1;
  document.getElementById("lahinRounded").checked = formData.lahinRounded || 1;
  document.getElementById("frontPocket").checked = formData.frontPocket || 1;
  document.getElementById("silkThread").checked = formData.silkThread;
  document.getElementById("stylishButtons").checked =
    formData.stylishButtons || 1;
  document.getElementById("stylishSuit").checked = formData.stylishSuit;
  document.getElementById("shalwarPocket").checked = formData.shalwarPocket;
};

const handleAddMeasuremnt = function (e) {
  e.preventDefault();
  addMeasurement(e, formAddMeasurememtWrapper, bodyElement);
};

const handleCloseForm = function () {
  bodyElement.removeChild(document.querySelector(".form-wrapper"));
};
const handleShowForm = function (formData) {
  const html = ` <div class="form-wrapper">
        <span class="btn-close-form">&times;</span>
        <form action="#" class="form form-${
          formData.id ? "update" : "add"
        }-measurement grid cols-2">
          <div class="measurment-details-section grid cols-2">
            <div>
              <label for="name">Name</label>
              <input type="text" id="name"  name="name" />
            </div>
            <div>
              <label for="numOfSuits">No. suits</label>
              <input type="number" name="numOfSuits" id="numOfSuits" />
            </div>
            <div>
              <label for="price">Price</label>
              <input type="number" name="price" id="price" />
            </div>
            <div>
              <label for="return-date">Return Date</label>
              <input type="date" name="returnDate" id="return-date" />
            </div>
          </div>
          <div class="measurment-form-col-1">
            <div>
              <label for="length">lambai</label>
              <input type="number" id="length"  name="length" />
            </div>
            <div>
              <label for="width">chorai</label>
              <input type="number" id="width" name="width" />
            </div>
            <div>
              <label for="shoulder">tira</label>
              <input type="number" id="shoulder" name="shoulder" />
            </div>
            <div>
              <label for="collar">collar</label>
              <input type="number" id="collar" name="collar" />
            </div>
            <div>
              <label for="chest">chati</label>
              <input type="number" id="chest" name="chest"/>
            </div>
            <div>
              <label for="fitness">gira</label>
              <input type="number" id="fitness" name="fitness" />
            </div>
            <div>
              <label for="sleeve">astin</label>
              <input type="number" id="sleeve" name="sleeve" />
            </div>
            <div>
              <label for="shalwar">shalwar</label>
              <input type="number" id="shalwar" name="shalwar" />
            </div>
            <div>
              <label for="pancha">pancha</label>
              <input type="number" id="pancha" name="pancha" />
            </div>
          </div>
          <div class="measurment-form-col-2 grid cols-2">
            <div>
              <label for="isCollar">Collar</label>
              <input type="checkbox" id="isCollar" class="checkbox" name="isCollar" />
            </div>
            <div>
              <label for="banRounded">Ban gol</label>
              <input type="checkbox" id="banGol" class="checkbox" name="banRounded" />
            </div>
            <div>
              <label for="lahinRounded">Lahin Gol</label>
              <input type="checkbox" id="lahinRounded" class="checkbox" name="lahinRounded" />
            </div>
            <div>
              <label for="frontPocket">Front pocket</label>
              <input type="checkbox" class="checkbox" id="frontPocket" name="frontPocket" />
            </div>
            <div>
              <label for="silkThread">Chamak Tar</label>
              <input type="checkbox" class="checkbox" id="silkThread" name="silkThread"/>
            </div>
            <div>
              <label for="stylishButtons">Btn designi</label>
              <input type="checkbox" class="checkbox" id="stylishButtons" name="stylishButtons" />
            </div>
            <div>
              <label for="stylishSuit">designi Suit</label>
              <input type="checkbox" class="checkbox" id="stylishSuit" name="stylishSuit" />
            </div>
            <div>
              <label for="shalwarPocket">Shalwar pocket</label>
              <input type="checkbox" class="checkbox" id="shalwarPocket" name="shalwarPocket"/>
            </div>
            <div>
              <label for="sleeveSimple">Astin Sada</label>
              <input
                type="number"
                name="sleeveSimple"
                id="sleeveSimple"
                class="input-small"
                
              />
            </div>
            <div>
              <label for="cuff">Suit cuff</label>
              <input type="number" name="cuff" id="cuff" class="input-small"  />
            </div>
            <div class="side-pockets-container">
              <label for="sidePockets" >Side pockets</label>
              <input type="number" class="input-side-pockets input-small"  id="sidePockets" name="sidePockets"/>
            </div>
          </div>
          <div class="form-measurment-btn-container">
            <button class="btn-form-add-measurement ">${
              formData.id ? "Update Measurement" : "Add Measurement"
            }</button>
          
          </div>
        </form>
      </div>`;
  if (!document.querySelector(".form-wrapper")) {
    bodyElement.insertAdjacentHTML("afterbegin", html);
    fillForm(formData);
    document
      .querySelector(".btn-close-form")
      .addEventListener("click", handleCloseForm);
    if (document.querySelector(".form-add-measurement"))
      document
        .querySelector(".form-add-measurement")
        .addEventListener("submit", handleAddMeasuremnt);
  }
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

const handleUpdateMeasurement = async function (e, id) {
  e.preventDefault();
  const form = document.querySelector(".form-update-measurement");
  const formData = new FormData(form);

  const updatedMeasurementData = modifyFormData(formData);
  console.log(id);
  const result = await window.api.updateMeasurement(id, updatedMeasurementData);

  if (result.changes) {
    bodyElement.removeChild(document.querySelector(".form-wrapper"));
    await showAlert(
      "success",
      `The measurement of ${updatedMeasurementData.name} is successfully updated`,
      bodyElement
    );

    sectionAllMeasurements.removeChild(
      document.querySelector(".measurement-item")
    );
    measurementItem = undefined;

    containerMeasurements.classList.remove("hide");

    handleShowAllMeasuremnts();
  } else {
    showAlert(
      "fail",
      `The measurement of ${updatedMeasurementData.name} is not updated`,
      bodyElement
    );
  }
  console.log(updatedMeasurementData);
  console.log(result);
};

const handleEditMeasurement = async function (e) {
  const id = e.currentTarget.dataset.editItemId;
  const measurementToEdit = await window.api.getMeasurement(id);
  handleShowForm(measurementToEdit);
  document
    .querySelector(".form-update-measurement")
    .addEventListener("submit", (e) => handleUpdateMeasurement(e, id));
};

const handleDeleteMeasurement = async function (id) {
  const result = await window.api.deleteMeasurement(id);

  if (result.changes) {
    showAlert(
      "success",
      `The measurement is successfully deleted`,
      bodyElement
    );
    sectionHome.classList.add("hide");
    sectionAllMeasurements.removeChild(measurementItem);
    measurementItem = undefined;
    containerMeasurements.classList.remove("hide");
    allMeasurementList.classList.remove("hide");
    handleShowAllMeasuremnts();
  } else {
    showAlert("success", `The measurement is not deleted`, bodyElement);
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

if (btnSeeAllMeasurments)
  btnSeeAllMeasurments.addEventListener("click", handleShowAllMeasuremnts);

if (btnHome) btnHome.addEventListener("click", handleHomeBtn);

if (btnMeasurements)
  btnMeasurements.addEventListener("click", handleMeasurementBtn);
