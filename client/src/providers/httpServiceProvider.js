import axios from "axios";
import { camelizeObject } from "@/utils/common";

// Это все заготовки

const responseData = (data, responseType = null) => {
  if (responseType == "blob") return data;
  if (_.has(data, "data") && _.isObject(data.data))
    return camelizeObject(data.data);
  if (_.isObject(data)) return camelizeObject(data);

  return data;
};

export const httpServiceProvider = {
  post: async (route, params, responseType = "json") => {
    const { data } = await axios.post(route, params, { responseType });
    return responseData(data, responseType);
  },

  get: async (route, params, responseType = "json") => {
    let response = await axios.get(route, { params, responseType });

    if (responseType == "blob") {
      response.data.fileName = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
        response.headers["content-disposition"].replace(/['"]/g, "")
      )[1];

      return response.data;
    }

    return responseData(response.data, responseType);
  },

  put: async (route, params, responseType = "json") => {
    const { data } = await axios.put(route, params, { responseType });
    return responseData(data, responseType);
  },

  patch: async (route, params) => {
    const { data } = await axios.patch(route, params);
    return responseData(data);
  },

  delete: async (route) => {
    const { data } = await axios.delete(route);
    return responseData(data);
  },
};
