import { showAlert } from "./alert.js";

export const addMeasurement = async function (e, formAddMeasurememtWrapper) {
  const measurementData = {};
  const form = e.currentTarget;
  const formData = new FormData(form);

  for (const [key, value] of formData) {
    if (isNaN(Number(value)) && value !== "on") {
      measurementData[key] = value;
    } else if (value === "on") {
      measurementData[key] = 1;
    } else measurementData[key] = Number(value);
  }

  const body = e.currentTarget.closest("body");
  measurementData.createdAt = Date.now();

  const data = await window.api.addMeasurement(measurementData);

  if (data.success)
    await showAlert(
      "success",
      `The measurement of ${measurementData.name} is successfully created`,
      body
    );
  else {
    showAlert(
      "fail",
      "The measurement is not added! Please try again",
      e.currentTarget.closest("body")
    );
    return;
  }

  form.reset();
  formAddMeasurememtWrapper.style.display = "none";
};

export const showAllMeasurements = async function (
  sectionHome,
  allMeasurementList,
  allMeasurementsWrapper
) {
  sectionHome.classList.add("hide");
  allMeasurementsWrapper.classList.remove("hide");

  const data = await window.api.getMeasurements();

  const measurementItemsHtml = data
    .map((el) => {
      return ` <li class="list-item" data-measurement-item=${el.id}>
            <p>${el.name} </p>
            <p>${el.numOfSuits}</p>
            <p>${el.returnDate}</p>
          </li>`;
    })
    .join(" ");

  allMeasurementList.insertAdjacentHTML("afterend", measurementItemsHtml);
};

export const showMeasurement = async function (
  e,
  containerMeasurements,
  sectionAllMeasurments
) {
  const id = e.currentTarget.dataset.measurementItem;
  const measurement = await window.api.getMeasurement(id);

  containerMeasurements.style.display = "none";

  const measurementHtml = `<div class="measurement-item grid cols-2"> 
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
            <p>${measurement.width} </p>
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
              <label for="cutBan">Cut Ban</label>
              <input type="checkbox" name="cutBan" id="cutBan">
          </div>
          <div>
            <label for="aamBan">Aam Ban</label>
            <input type="checkbox" name="aamBan" id="aamBan">
          </div>
          <div>
            <label for="lahinGol">Lahin Gol</label>
            <input type="checkbox" name="lahinGol" id="lahinGol">
          </div>
          <div>
            <label for="lahinSada">Lahin Sada</label>
            <input type="checkbox" name="lahinSada" id="lahinSada">
          </div>
        </div>

        <div>
          <p>Cuff</p>
          <p>9</p>
        </div>

        <div class="grid cols-2">
          <div>
            <label for="aamSuit">Aam suit</label>
            <input type="checkbox" name="aamSuit" id="aamSuit">
          </div>
          <div>
            <label for="stylishSuit">Designi suit</label>
            <input type="checkbox" name="stylishSuit" id="stylishSuit">
          </div>
          <div>
            <label for="shalwarPocketMeasurment">Shalwar Pocket</label>
            <input type="checkbox" name="shalwarPocketMeasurment" id="shalwarPocketMeasurment">
          </div>
        </div>
            <div>
             <p>Astin Sada</p>
             <p>5</p>
            </div>
        </div>`;

  sectionAllMeasurments.insertAdjacentHTML("beforeend", measurementHtml);
};
