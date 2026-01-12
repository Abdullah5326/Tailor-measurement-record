import { showAlert } from "./alert.js";
import { modifyFormData } from "./utils.js";

export const addMeasurement = async function (e, formAddMeasurememtWrapper) {
  const form = e.currentTarget;
  const formData = new FormData(form);

  const measurementData = modifyFormData(formData);
  // for (const [key, value] of formData) {
  //   if (isNaN(Number(value)) && value !== "on") {
  //     measurementData[key] = value;
  //   } else if (value === "on") {
  //     measurementData[key] = 1;
  //   } else measurementData[key] = Number(value);
  // }

  const body = e.currentTarget.closest("body");
  // measurementData.createdAt = Date.now();

  const data = await window.api.addMeasurement(measurementData);

  if (data.success) {
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
};

export const showAllMeasurements = async function (
  sectionHome,
  allMeasurementList,
  allMeasurementsWrapper
) {
  sectionHome.classList.add("hide");
  allMeasurementsWrapper.classList.remove("hide");

  const data = await window.api.getMeasurements();

  console.log("Length", data.length);

  allMeasurementList.innerHTML = "";

  allMeasurementList.insertAdjacentHTML(
    "beforeend",
    `<li class="list-item-header">
            <p>Name</p>
            <p>No Suits</p>
            <p>Return date</p>
          </li>`
  );
  const measurementItemsHtml = data
    .map((el) => {
      return ` <li class="list-item" data-measurement-item=${el.id}>
            <p>${el.name} </p>
            <p>${el.numOfSuits}</p>
            <p>${el.returnDate}</p>
          </li>`;
    })
    .join(" ");

  allMeasurementList.insertAdjacentHTML("beforeend", measurementItemsHtml);
};

export const showMeasurement = async function (
  e,
  containerMeasurements,
  sectionAllMeasurments
) {
  const id = e.currentTarget.dataset.measurementItem;
  const measurement = await window.api.getMeasurement(id);

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
          
        </div>`;

  sectionAllMeasurments.insertAdjacentHTML("beforeend", measurementHtml);
};
