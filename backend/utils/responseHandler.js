const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

const errorResponse = (message, errors = null) => {
  return {
    success: false,
    message,
    errors,
  };
};

module.exports = { successResponse, errorResponse };