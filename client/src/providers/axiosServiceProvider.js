import axios from "axios";
import { onError } from "@/plugins/alert";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    onError(error);

    return Promise.reject({
      code: error.response.status,
      message: error.message,
    });
  }
);
