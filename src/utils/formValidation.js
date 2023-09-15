const formValidator = {
  imageRegex: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(png|jpe?g)$/,
  numberRegex: /^(?:[1-9]\d?|100)$/,

  validateString: (string) => {
    return (typeof string === "string" && string.trim().length > 0);
  },

  validateName: (name) => {
    return formValidator.validateString(name) && name.trim().length < 51;
  },

  validateImage: (image) => {
    return formValidator.validateString(image) && formValidator.imageRegex.test(image);
  },

  validateSummary: (summary) => {
    return formValidator.validateString(summary) && summary.trim().length < 256;
  },

  validateHealthScore: (healthScore) => {
    const parsedNumber = Number(healthScore);
    return formValidator.numberRegex.test(parsedNumber);
  },

  validateTime: (time) => {
    return time > 5 && time <= 600;
  },

  validateArrays: (array) => {
    return Array.isArray(array) && array.length >= 1;
  },
};

export {
  formValidator
};
