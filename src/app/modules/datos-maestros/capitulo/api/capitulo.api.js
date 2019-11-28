import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/capitulos`;

export const GetPageCapitulo = (idTitulo, page, pageSize, filters = null) => {
  const params = {
    page,
    pageSize,
    "filters.idTitulo": idTitulo,
    "filters.numeroCapitulo": filters.numeroCapitulo,
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

export const GetCapitulo = idCapitulo => {
  return Axios.get(`${apiUrl}/${idCapitulo}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveCapitulo = capitulo => {
  return Axios.post(`${apiUrl}`, capitulo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateCapitulo = (idCapitulo, capitulo) => {
  return Axios.put(`${apiUrl}/${idCapitulo}`, capitulo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const DeleteCapitulo = idCapitulo => {
  return Axios.delete(`${apiUrl}/${idCapitulo}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
