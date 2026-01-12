export const showAlert = async function (type, message, parentEl) {
  const el = ` <div class="alert alert-${type}">
    <img src="./../../assets/icons-ui/SVG/${
      type === "success" ? "checkmark" : "cross"
    }.svg" class="icon" alt="icon-check"></img>
      <p>${message}</p>
    </div>`;

  parentEl.insertAdjacentHTML("afterbegin", el);

  setTimeout(function () {
    // alert.remove();

    parentEl.removeChild(document.querySelector(".alert"));
  }, 3000);
};
