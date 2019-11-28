//import moment from "moment";
import Axios from "axios";
import {
	AppConfig
} from "app/core/config/app.config";

const {
	urlBaseProject: baseUrl
} = AppConfig;

// const fechaRegistro = moment();
// export const GetPageNorma = (page, pageSize, filter = null) => {
//   console.log("filtros norma", filter);
//   const filters = {
//     ...filter
//   };

//   const source = [
//     {
//       idNorma: 1,
//       numeroNorma: "ads",
//       descripcion: "asdds",
//       fechaRegistro: fechaRegistro
//     },
//     {
//       idNorma: 2,
//       numeroNorma: "afafas",
//       descripcion: "sfsdf",
//       fechaRegistro: fechaRegistro
//     },
//     {
//       idNorma: 3,
//       numeroNorma: "sfs",
//       descripcion: "wrwefw",
//       fechaRegistro: fechaRegistro
//     },
//     {
//       idNorma: 4,
//       numeroNorma: "wef",
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

const apiUrl = `${baseUrl}/api/normas`;

export const GetPageNorma = (page, pageSize, filters = null) => {
	const params = {
		page,
		pageSize,
		"filters.numeroNorma": filters.numeroNorma,
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

export const GetNorma = idNorma => {
	return Axios.get(`${apiUrl}/${idNorma}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveNorma = norma => {
	return Axios.post(`${apiUrl}`, norma)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateNorma = (idNorma, norma) => {
	return Axios.put(`${apiUrl}/${idNorma}`, norma)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteNorma = (idNorma) => {
	return Axios.delete(`${apiUrl}/${idNorma}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};