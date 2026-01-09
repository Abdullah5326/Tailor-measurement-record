// import model from "./../model";

const btnAddMeasurment = document.querySelector(".btn-add-measurment");
const formAddMeasurment = document.querySelector(".form-add-measurment");

btnAddMeasurment.addEventListener("click", function () {
  formAddMeasurment.style.display = "block";
});

formAddMeasurment.addEventListener("submit", (e) => {
  e.preventDefault();
  const length = document.getElementById("length").value;
  const width = document.getElementById("width").value;
  const shoulder = document.getElementById("shoulder").value;
  const collor = document.getElementById("collor").value;
  const chest = document.getElementById("chest").value;
  const slave = document.getElementById("slave").value;
  const pant = document.getElementById("pant");
  const pancha = document.getElementById("pancha").value;

  const measurment = {
    length,
    width,
    shoulder,
    collor,
    slave,
    chest,
    pant,
    pancha,
  };

  model.measurments.push(measurment);

  formAddMeasurment.style.display = "none";
});
