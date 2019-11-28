import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/articulos`;

export const GetPageArticulo = (idCapitulo, page, pageSize, filters = null) => {
  const params = {
    page,
    pageSize,
    "filters.idCapitulo": idCapitulo,
    "filters.numeroArticulo": filters.numeroArticulo,
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

export const GetArticulo = idArticulo => {
  return Axios.get(`${apiUrl}/${idArticulo}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveArticulo = articulo => {
  return Axios.post(`${apiUrl}`, articulo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateArticulo = (idArticulo, articulo) => {
  return Axios.put(`${apiUrl}/${idArticulo}`, articulo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const DeleteArticulo = idArticulo => {
  return Axios.delete(`${apiUrl}/${idArticulo}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
