export const showAlert = async function (type, message, parentEl) {
  const el = ` <div class="alert alert-${type}">
      <p>${message}</p>
    </div>`;

  parentEl.insertAdjacentHTML("afterbegin", el);

  setTimeout(function () {
    // alert.remove();

    parentEl.removeChild(document.querySelector(".alert"));
  }, 5000);
};
