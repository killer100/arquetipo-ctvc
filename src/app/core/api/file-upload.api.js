import axios from "axios";
import {
    AppConfig
} from "app/core/config/app.config";

const {
    urlBaseProject: baseUrl
} = AppConfig;
/**
 *
 * @param {any[]} files
 */
export const UploadTempFile = files => {
  const formData = new FormData();
  files.forEach((file, i) => {
    formData.append(`files`, file);
  });

  const headers = { "Content-Type": "multipart/form-data" };

  return axios
    .post(`${baseUrl}/api/file/upload`, formData, { headers })
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
