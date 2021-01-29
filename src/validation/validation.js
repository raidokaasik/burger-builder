// Form Validator(Not working properly)

export const Validation = (value, validation) => {
  let isvalid = true;
  if (!validation) {
    return true;
  }
  if (validation.required) {
    isvalid = value.trim() !== "" && isvalid;
  }
  if (validation.minLength) {
    isvalid = validation.minLength === value.length;
  }
  return isvalid;
};
