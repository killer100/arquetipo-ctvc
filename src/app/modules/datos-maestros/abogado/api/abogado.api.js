// import { dataSourceAbogados } from "./datasource";

// export const GetPageAbogados = (page, pageSize, filter = null) => {
//   const source = filter
//     ? dataSourceAbogados.filter(
//         x =>
//           x.dniAbogado.includes(filter.dniAbogado) &&
//           x.nombres.includes(filter.nombres) &&
//           x.primerApellido.includes(filter.primerApellido) &&
//           x.segundoApellido.includes(filter.segundoApellido)
//       )
//     : dataSourceAbogados;

//   const items = source.slice((page - 1) * pageSize).slice(0, pageSize);

//   const total = source.length;

//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: { items, total }
//       });
//     }, 500);
//   });
// };

// export const GetAbogado = id => {
//   const abogado = dataSourceAbogados.find(x => x.idAbogado == id);

//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: { abogado }
//       });
//     }, 500);
//   });
// };

// export const DeleteAbogado = id => {
//   dataSourceAbogados.splice(
//     dataSourceAbogados.findIndex(x => x.idAbogado == id),
//     1
//   );
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: null,
//         msg: "Se eliminó el abogado"
//       });
//     }, 500);
//   });
// };

import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/abogados`;

export const GetPageAbogados = (page, pageSize, filters = null) => {
  const params = {
    page,
    pageSize,
    "filters.dniAbogado": filters.dniAbogado,
    "filters.nombres": filters.nombres,
    "filters.primerApellido": filters.primerApellido,
    "filters.segundoApellido": filters.segundoApellido
  };
  return Axios.get(`${apiUrl}`, {
    params
  })
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const GetAbogado = idAbogado => {
  return Axios.get(`${apiUrl}/${idAbogado}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveAbogado = abogado => {
  return Axios.post(`${apiUrl}`, abogado)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateAbogado = (idAbogado, abogado) => {
  return Axios.put(`${apiUrl}/${idAbogado}`, abogado)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const DeleteAbogado = idAbogado => {
  return Axios.delete(`${apiUrl}/${idAbogado}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
