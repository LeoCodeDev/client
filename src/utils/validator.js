const isImageUrl = (value) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(png|jpe?g)$/;
  return regex.test(value);
};
const isNumber = (value) => {
  return isNaN(Number(value));
};

const isString = (value) => {
  const regex = /^(?=(?:.*[a-zA-Z]){3,})(?!^\d+$)^[a-zA-Z0-9\s]+$/;
  return regex.test(value);
};

export { isImageUrl, isNumber, isString };
