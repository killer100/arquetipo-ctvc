import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/faltas`;

export const GetPageFalta = (idArticulo, page, pageSize, filters = null) => {
  const params = {
    page,
    pageSize,
    "filters.idArticulo": idArticulo,
    "filters.numeroFalta": filters.numeroFalta,
    "filters.descripcion": filters.descripcion
  };
  return Axios.get(`${apiUrl}`, {
    params
  })
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const GetFalta = idFalta => {
  return Axios.get(`${apiUrl}/${idFalta}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveFalta = falta => {
  return Axios.post(`${apiUrl}`, falta)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateFalta = (idFalta, falta) => {
  return Axios.put(`${apiUrl}/${idFalta}`, falta)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const DeleteFalta = idFalta => {
  return Axios.delete(`${apiUrl}/${idFalta}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
