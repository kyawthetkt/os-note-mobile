export const errorObjectHandler = (errorObj = null) => {
  return errorObj ? JSON.parse(JSON.stringify(errorObj)) : null;
};

export const customizeServerError = (code, msg = 'Error Occured.') => {
  if (code === 401) {
    return 'Phone No. or Password is wrong.';
  }
  if (code === 500) {
    return 'Server is occuring error.';
  }
  return msg;
};
