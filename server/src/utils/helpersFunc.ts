type Data = {
  [key: string]: any;
};

export const checkEmpty = (data: Data) => {
  const error = {
    field: '',
    message: '',
  };
  Object.keys(data).some((el) => {
    if (data[el].length === 0) {
      error.field = el;
      error.message = `Please provide a ${el}`;
      return true;
    }
  });
  return error;
};

export const inEnum = (enu: any, value: string) => {
  return Object.values(enu).includes(value);
};
