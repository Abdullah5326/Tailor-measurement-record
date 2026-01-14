import { showAlert } from "./alert.js";
import {
  addMeasurement,
  getMeasurements,
  deleteMeasurement,
  getMeasurement,
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
const inputSearch = document.querySelector(".input-search");
let allMeasurementsContainer, measurementItem;

class Measurement {
  #measurements;
  constructor() {
    btnSeeAllMeasurments.addEventListener(
      "click",
      this.handleShowAllMeasuremnts.bind(this)
    );
    btnAddMeasurment.addEventListener("click", this.handleShowForm.bind(this));
    btnHome.addEventListener("click", this.handleHomeBtn);
    btnMeasurements.addEventListener("click", this.handleMeasurementBtn);

    inputSearch.addEventListener("input", this.handleSearch.bind(this));
  }

  showAllMeasurements(data) {
    sectionHome.classList.add("hide");
    allMeasurementsWrapper.classList.remove("hide");

    allMeasurementList.innerHTML = "";

    const measurementItemsHtml = data
      .reverse()
      .map((el) => {
        return ` <li class="list-item" data-measurement-item=${el.id}>
            <p>${el.name} </p>
            <p>${el.numOfSuits}</p>
            <p>${el.returnDate}</p>
          </li>`;
      })
      .join(" ");

    allMeasurementList.insertAdjacentHTML("beforeend", measurementItemsHtml);
    const measurementItems = [...document.querySelectorAll(".list-item")];

    if (measurementItems)
      measurementItems.forEach((el) =>
        el.addEventListener("click", this.handleShowMeasurement.bind(this))
      );
  }

  handleSearch() {
    const name = document.querySelector(".input-search").value;
    let searchItems = this.#measurements.filter((item) =>
      item.name.toLowerCase().startsWith(name.toLowerCase())
    );
    this.showAllMeasurements(searchItems);
  }

  async handleShowAllMeasuremnts() {
    this.#measurements = await getMeasurements();
    this.showAllMeasurements(this.#measurements);
  }

  handleShowForm(formData) {
    const html = `<div class="overlay"></div> <div class="form-wrapper">
  
        <span class="btn-close-form">&times;</span>
        <form action="#" class="form form-${
          formData.id ? "update" : "add"
        }-measurement grid cols-2">
          <div class="measurment-details-section grid cols-2">
            <div>
              <label for="name">Name</label>
              <input type="text" id="name"  name="name" required/>
            </div>
            <div>
              <label for="numOfSuits">No. suits</label>
              <input type="number" name="numOfSuits" id="numOfSuits" required/>
            </div>
            <div>
              <label for="price">Price</label>
              <input type="number" name="price" id="price" required/>
            </div>
            <div>
              <label for="return-date">Return Date</label>
              <input type="date" name="returnDate" id="return-date" required />
            </div>
          </div>
          <div class="measurment-form-col-1">
            <div>
              <label for="length">lambai</label>
              <input type="number" id="length"  name="length" step="0.01" required/>
            </div>
            <div>
              <label for="shoulder">tira</label>
              <input type="number" id="shoulder" name="shoulder" step="0.01"    required/>
            </div>
            <div>
              <label for="collar">collar</label>
              <input type="number" id="collar" name="collar"  step="0.01"  required />
            </div>
            <div>
              <label for="chest">chati</label>
              <input type="number" id="chest" name="chest" step="0.01"   required/>
            </div>
            <div>
              <label for="fitness">gira</label>
              <input type="number" id="fitness" name="fitness"  step="0.01"   required/>
            </div>
            <div>
              <label for="sleeve">astin</label>
              <input type="number" id="sleeve" name="sleeve"  step="0.01"  required />
            </div>
            <div>
              <label for="shalwar">shalwar</label>
              <input type="number" id="shalwar" name="shalwar"  step="0.01"  required />
            </div>
            <div>
              <label for="pancha">pancha</label>
              <input type="number" id="pancha" name="pancha"   step="0.01"  required/>
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
                step="0.01" 
                
              />
            </div>
            <div>
              <label for="cuff">Suit cuff</label>
              <input type="number" name="cuff" id="cuff" class="input-small" step="0.01"   />
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
      this.fillForm(formData);
      document
        .querySelector(".btn-close-form")
        .addEventListener("click", this.handleCloseForm);
      if (document.querySelector(".form-add-measurement"))
        document
          .querySelector(".form-add-measurement")
          .addEventListener("submit", this.handleAddMeasuremnt);
    }
  }

  handleCloseForm() {
    bodyElement.removeChild(document.querySelector(".form-wrapper"));
    bodyElement.removeChild(document.querySelector(".overlay"));
  }

  async handleAddMeasuremnt(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const measurementData = modifyFormData(formData);
    const body = e.currentTarget.closest("body");
    measurementData.createdAt = Date.now();
    measurementData.width = 21;

    const result = await addMeasurement(measurementData);

    if (result.success) {
      await showAlert(
        "success",
        `The measurement of ${measurementData.name} is successfully created`,
        body
      );
      body.removeChild(document.querySelector(".form-wrapper"));
      body.removeChild(document.querySelector(".overlay"));
    } else {
      showAlert(
        "fail",
        "The measurement is not added! Please try again",
        e.currentTarget.closest("body")
      );
      return;
    }

    form.reset();
  }

  handleHomeBtn() {
    if (measurementItem) {
      sectionAllMeasurements.removeChild(measurementItem);
      measurementItem = undefined;
    }

    containerMeasurements.classList.remove("hide");
    allMeasurementList.textContent = "";
    allMeasurementsWrapper.classList.add("hide");
    sectionHome.classList.remove("hide");
  }

  handleMeasurementBtn() {
    sectionHome.classList.add("hide");
    if (measurementItem) {
      sectionAllMeasurements.removeChild(measurementItem);
      measurementItem = undefined;
    }
    console.log(document.querySelector(".customers"));
    containerMeasurements.classList.remove("hide");
    document.querySelector(".customers").classList.add("hide");
    allMeasurementList.classList.remove("hide");
  }

  async handleShowMeasurement(e) {
    const id = e.currentTarget.dataset.measurementItem;
    const measurement = await getMeasurement(id);

    containerMeasurements.classList.add("hide");
    const measurementHtml = `<div class="measurement-item grid cols-2"> 
  <div class="dots operation-menu-dots" data-measurement-item-id=${id}> 
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>   
        <div class="operation-menu hide">
          <button class=" btn-edit" data-edit-item-id=${id}>
           <img src="./../../assets/icons-ui/SVG/pencil.svg" alt="" class="icon">
          Edit</button>
          <button class="btn-delete">
          <img src="./../../assets/icons-ui/SVG/bin.svg" alt="" class="icon">
          Delete</button>
        </div>
        <div class="measurement-header">
          <div>
            <p>name</p>
            <p>${measurement.name} </p>
          </div>
          <div>
            <p>return date</p>
            <p>${measurement.returnDate}</p>
          </div>
          <div>
            <p>No. suits</p>
            <p>${measurement.numOfSuits}</p>
          </div>
          <div>
            <p>Price</p>
            <p>${measurement.price} </p>
          </div>
        </div>

        <div class="measurement-item-main">
          <div>
            <p>Lambai</p>
            <p>${measurement.length} </p>
          </div>
          <div>
            <p>gira</p>
            <p>${measurement.fitness} </p>
          </div>
          <div>
            <p>tira</p>
            <p>${measurement.shoulder} </p>
          </div>
          <div>
            <p>Astin</p>
            <p>${measurement.sleeve} </p>
          </div>
          <div>
            <p>collar</p>
            <p>${measurement.collar} </p>
          </div>
          <div>
            <p>chati</p>
            <p>${measurement.chest} </p>
          </div>
          <div>
            <p>shalwar</p>
            <p>${measurement.shalwar}</p>
          </div>
          <div>
            <p>pancha</p>
            <p>${measurement.pancha} </p>
          </div>
        </div>

        <div class="measurement-item-options">
          <div class="grid cols-2">
          <div>
              <p>Collar</p>
             <div class="circle ${
               measurement.isCollar ? "circle-fill" : ""
             }"></div>
          </div>
            <div>
              <p>Cut Ban</p>
              <div class="circle ${
                measurement.banRounded ? "circle-fill" : ""
              }"></div>
          </div>
          <div>
            <p>Aam Ban</p>
          <div class="circle ${
            measurement.banRounded ? "" : "circle-fill"
          }"></div>
          </div>
          <div>
            <p>Lahin Gol</p>
          <div class="circle ${
            measurement.lahinRounded ? "circle-fill" : ""
          }"></div>
          </div>
          <div>
            <p>Lahin Sada</p>
            <div class="circle ${
              measurement.lahinRounded ? "" : "circle-fill"
            }"></div>
          </div>
          <div>
            <p>Designi Btns</p>
            <div class="circle ${
              measurement.stylishButtons ? "circle-fill" : ""
            }"></div>
          </div>
          <div>
            <p >Chamak Tar</p>
            <div class="circle ${
              measurement.silkThread ? "circle-fill" : ""
            }"></div>
          </div>
        </div>

        <div>
          <p>Cuff</p>
          <p>${measurement.cuff}</p>
        </div>

        <div class="grid cols-2">
          <div>
            <p >Aam suit</p>
            <div class="circle ${
              measurement.banRounded ? "" : "circle-fill"
            }"></div>
          </div>
          <div>
            <p>Designi suit</p>
            <div class="circle ${
              measurement.stylishSuit ? "circle-fill" : ""
            }"></div>
          </div>
          <div>
            <p >Shalwar Pocket</p>
            <div class="circle ${
              measurement.shalwarPocket ? "circle-fill" : ""
            }"></div>
          </div>
          <div>
            <p>Front Pocket</p>
            <div class="circle ${
              measurement.frontPocket ? "circle-fill" : ""
            }"></div>
          </div>
        </div>
            <div>
             <p>Astin Sada</p>
             <p>${measurement.sleeveSimple} </p>
            </div>
            <div class="side-pockets">
             <p>Side pockets</p>
             <p>${measurement.sidePockets} </p>
            </div>
          
        </div>`;

    sectionAllMeasurements.insertAdjacentHTML("beforeend", measurementHtml);
    measurementItem = document.querySelector(".measurement-item");

    const operationMenuDots = document.querySelector(".operation-menu-dots");

    operationMenuDots.addEventListener(
      "click",
      this.handleOperationMenu.bind(this)
    );
  }

  handleOperationMenu(e) {
    const operationMenu = document.querySelector(".operation-menu");
    operationMenu.classList.toggle("hide");

    const id = e.currentTarget.dataset.measurementItemId;
    const btnEdit = document.querySelector(".btn-edit");
    const btnDelete = document.querySelector(".btn-delete");

    btnEdit.addEventListener("click", this.handleEditMeasurement.bind(this));

    const deleteItem = () => {
      this.handleDeleteMeasurement(id);
    };

    btnDelete.addEventListener("click", deleteItem.bind(this));
  }

  async handleDeleteMeasurement(id) {
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
      this.handleShowAllMeasuremnts();
    } else {
      showAlert("success", `The measurement is not deleted`, bodyElement);
    }
  }

  async handleEditMeasurement(e) {
    const id = e.currentTarget.dataset.editItemId;
    const measurementToEdit = await window.api.getMeasurement(id);
    this.handleShowForm(measurementToEdit);

    const updateItem = function (e) {
      e.preventDefault();
      this.handleUpdateMeasurement(e, id);
    };
    document
      .querySelector(".form-update-measurement")
      .addEventListener("submit", updateItem.bind(this));
  }

  async handleUpdateMeasurement(e, id) {
    const form = document.querySelector(".form-update-measurement");
    const formData = new FormData(form);

    const updatedMeasurementData = modifyFormData(formData);
    updatedMeasurementData.width = 21;
    const result = await window.api.updateMeasurement(
      id,
      updatedMeasurementData
    );

    if (result.changes) {
      bodyElement.removeChild(document.querySelector(".form-wrapper"));
      bodyElement.removeChild(document.querySelector(".overlay"));
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

      this.handleShowAllMeasuremnts();
    } else {
      showAlert(
        "fail",
        `The measurement of ${updatedMeasurementData.name} is not updated`,
        bodyElement
      );
    }
  }

  fillForm(formData) {
    document.getElementById("name").value = formData.name || "";
    document.getElementById("numOfSuits").value = formData.numOfSuits;
    document.getElementById("price").value = formData.price;
    document.getElementById("return-date").value = formData.returnDate;
    document.getElementById("length").value = formData.length;
    document.getElementById("shoulder").value = formData.shoulder;
    document.getElementById("collar").value = formData.collar;
    document.getElementById("chest").value = formData.chest;
    document.getElementById("fitness").value = formData.fitness;
    document.getElementById("sleeve").value = formData.sleeve;
    document.getElementById("shalwar").value = formData.shalwar;
    document.getElementById("pancha").value = formData.pancha;
    document.getElementById("sleeveSimple").value = formData.sleeveSimple;
    document.getElementById("cuff").value = formData.cuff;
    document.getElementById("sidePockets").value = formData.sidePockets;

    document.getElementById("isCollar").checked = formData.isCollar;
    document.getElementById("banGol").checked = formData.banRounded;
    document.getElementById("lahinRounded").checked = formData.lahinRounded;
    document.getElementById("frontPocket").checked = formData.frontPocket;
    document.getElementById("silkThread").checked = formData.silkThread;
    document.getElementById("stylishButtons").checked = formData.stylishButtons;
    document.getElementById("stylishSuit").checked = formData.stylishSuit;
    document.getElementById("shalwarPocket").checked = formData.shalwarPocket;
  }
}

const measurementFeature = new Measurement();
