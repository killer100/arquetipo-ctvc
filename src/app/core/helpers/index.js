import queryString from "query-string";

export const getValueFromQs = (qs, prop) => {
  const values = queryString.parse(qs);
  return values[prop] ? values[prop] : null;
};

export const getProp = (obj, key) => {
  return obj && obj[key] ? obj[key] : null;
};

export const isNullOrUndefined = val => {
  return val == null || typeof val === "undefined";
};

export const existsProp = (obj, key) => {
  return !isNullOrUndefined(obj) && !isNullOrUndefined(obj[key]);
};

export const ConvertToQueryParams = (obj, keyParent = null) => {
  let resp = {};
  Object.keys(obj).forEach(k => {
    const value = obj[k];
    const key = keyParent ? `${keyParent}.${k}` : k;

    if (value) {
      if (Array.isArray(value)) {
        resp[key] = arrayToString(value);
      } else if (typeof value === "object" && value.constructor === Object) {
        const children = ConvertToQueryParams(value, key);

        resp = {
          ...resp,
          ...children
        };
      } else {
        resp[key] = String(obj[k]);
      }
    }
  });
  return resp;
};

export const arrayToString = arr => {
  let str = "";

  if (arr != null) {
    arr.forEach(function(i, index) {
      str += i;
      if (index != arr.length - 1) {
        str += ",";
      }
    });
  }
  return str;
};

export const HandleOnlyNumber = (e, callback) => {
  const regexWithOutDecimals = new RegExp(/^\d+$/);
  const value = e.target.value;
  if (value && !regexWithOutDecimals.test(e.target.value)) {
    e.preventDefault();
  } else {
    callback();
  }
};
