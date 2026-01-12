export const modifyFormData = function (formData) {
  const modifiedFormData = {};

  for (const [key, value] of formData) {
    if (isNaN(Number(value)) && value !== "on") {
      modifiedFormData[key] = value;
    } else if (value === "on") {
      modifiedFormData[key] = 1;
    } else modifiedFormData[key] = Number(value);
  }

  modifiedFormData.createdAt = Date.now();

  return modifiedFormData;
};
