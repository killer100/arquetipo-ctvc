//import moment from "moment";
import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

// const fechaRegistro = moment();

// export const GetPageTitulo = (idTitulo, page, pageSize, filter = null) => {
//   console.log("idTitulo", idTitulo, "filtros titulo", filter);
//   const filters = {
//     ...filter
//   };

//   const source = [
//     {
//       idTitulo: 1,
//       numeroTitulo: "ads",
//       descripcion: "asdds",
//       fechaRegistro: fechaRegistro
//     },
//     {
//       idTitulo: 2,
//       numeroTitulo: "afafas",
//       descripcion: "sfsdf",
//       fechaRegistro: fechaRegistro
//     },
//     {
//       idTitulo: 3,
//       numeroTitulo: "sfs",
//       descripcion: "wrwefw",
//       fechaRegistro: fechaRegistro
//     },
//     {
//       idTitulo: 4,
//       numeroTitulo: "wef",
//       descripcion: "dfgdgdfgd",
//       fechaRegistro: fechaRegistro
//     }
//   ];

//   const items = source.slice((page - 1) * pageSize).slice(0, pageSize);

//   const total = source.length;

//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: {
//           items,
//           total
//         }
//       });
//     }, 500);
//   });
// };

const apiUrl = `${baseUrl}/api/titulos`;

export const GetPageTitulo = (idNorma, page, pageSize, filters = null) => {
  const params = {
    page,
    pageSize,
    "filters.idNorma": idNorma,
    "filters.numeroTitulo": filters.numeroTitulo,
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

export const GetTitulo = idTitulo => {
  return Axios.get(`${apiUrl}/${idTitulo}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveTitulo = titulo => {
  return Axios.post(`${apiUrl}`, titulo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateTitulo = (idTitulo, titulo) => {
  return Axios.put(`${apiUrl}/${idTitulo}`, titulo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const DeleteTitulo = idTitulo => {
  return Axios.delete(`${apiUrl}/${idTitulo}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
