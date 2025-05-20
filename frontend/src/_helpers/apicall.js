import axios from "axios";
import { REDUX_KEYS } from "./constants";
import get from "lodash.get";

function clean(object) {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === "object") {
      clean(v);
    }
    if ((v && typeof v === "object" && !Object.keys(v).length) || v === null || v === undefined) {
      if (Array.isArray(object)) {
        object.splice(k, 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
}

export const apicall = (method, config) => {
  const { url, headers = {}, data = {}, paramsSerializer, options, doClean = true } = config;
  const paramsKey = method === "get" ? "params" : "data";

  const requestHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  var Json = JSON.parse(localStorage.getItem(`persist:${REDUX_KEYS.REDUX}`))[REDUX_KEYS.REDUX_USER] || {};
  const token = get(JSON.parse(Json), "user.accessToken") || null;
  if (token) {
    requestHeaders.Authorization = `token ${token}`;
  }

  const axioOptions = {
    method,
    url,
    headers: { ...requestHeaders, ...headers },
    // timeout: 5000,
    [paramsKey]: doClean ? clean(data) : data,
    ...options
  };

  if (paramsSerializer) {
    axioOptions.paramsSerializer = paramsSerializer;
  }

  return new Promise((resolve, reject) => {
    axios(axioOptions)
      .then((res) => {
        resolve({ ...res.data, ...res });
      })
      .catch((err) => {
        const { response } = err;
        if (response) {
          reject({ ...response.data, ...response });
        } else {
          reject(new Error("Something went wrong"));
        }
      });
  });
};

export const getRequest = (config) => apicall("get", config);

export const postRequest = (config) => apicall("post", config);

export const putRequest = (config) => apicall("put", config);

export const patchRequest = (config) => apicall("patch", config);

export const deleteRequest = (config) => apicall("delete", config);
