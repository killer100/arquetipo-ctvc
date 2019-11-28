import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/resoluciones-conclusion`;

export const GetResolucionConclusion = idResolucionConclusion => {
  return Axios.get(`${apiUrl}/${idResolucionConclusion}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveResolucionConclusion = resolucionConclusion => {
  return Axios.post(`${apiUrl}`, resolucionConclusion)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateResolucionConclusion = (
  idResolucionConclusion,
  resolucionConclusion
) => {
  return Axios.put(`${apiUrl}/${idResolucionConclusion}`, resolucionConclusion)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
