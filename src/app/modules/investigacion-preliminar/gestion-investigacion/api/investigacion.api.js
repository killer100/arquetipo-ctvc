// import { dataSourceInvestigacion } from "./datasource";

// export const GetPageInvestigacion = (page, pageSize, filter = null) => {
//   const { fechaInicio, fechaFin } = filter;
//   const filters = {
//     ...filter,
//     fechaInicio: fechaInicio ? fechaInicio.format("YYYY-MM-DD") : fechaInicio,
//     fechaFin: fechaFin ? fechaFin.format("YYYY-MM-DD") : fechaFin
//   };
//   console.log(filters);
//   const source = dataSourceInvestigacion;

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

// export const GetInvestigacion = id => {
//   const investigacion = dataSourceInvestigacion.find(
//     x => x.idExpedienteInvestigacion == id
//   );

//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: { investigacion }
//       });
//     }, 500);
//   });
// };

// export const DeleteInvestigacion = id => {
//   dataSourceInvestigacion.splice(
//     dataSourceInvestigacion.findIndex(x => x.idExpedienteInvestigacion == id),
//     1
//   );
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: null,
//         msg: "Se eliminó la investigacion"
//       });
//     }, 500);
//   });
// };

import Axios from "axios";
import {
	AppConfig
} from "app/core/config/app.config";
import {
	ConvertToQueryParams
} from "app/core/helpers";

const {
	urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/expedientes-investigacion`;

export const GetPageInvestigacion = (page, pageSize, filters = null) => {

	const params = {
		page,
		pageSize,
		...filters,
		fechaInicio: filters.fechaInicio ? filters.fechaInicio.format("YYYY-MM-DD") : null,
		fechaFin: filters.fechaFin ? filters.fechaFin.format("YYYY-MM-DD") : null
	};

	return Axios.get(`${apiUrl}`, {
		params: ConvertToQueryParams(params)
	}).then(response => response.data).catch(err => {
		throw err.response;
	});
};

export const GetInvestigacion = id => {
	return Axios.get(`${apiUrl}/${id}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveInvestigacion = investigacion => {
	return Axios.post(`${apiUrl}`, investigacion)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateInvestigacion = (idInvestigacion, investigacion) => {
	return Axios.put(`${apiUrl}/${idInvestigacion}`, investigacion)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteInvestigacion = (id) => {
	return Axios.delete(`${apiUrl}/${id}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// INVESTIGADOS
//=======================================

export const GetInvestigado = (idExpedienteInvestigacion, idInvestigado) => {
	return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}/investigados/${idInvestigado}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveInvestigado = (idExpedienteInvestigacion, investigado) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/investigados`, investigado)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateInvestigado = (idExpedienteInvestigacion, idInvestigado, investigado) => {
	return Axios.put(`${apiUrl}/${idExpedienteInvestigacion}/investigados/${idInvestigado}`, investigado)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteInvestigado = (idExpedienteInvestigacion, idInvestigado) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/investigados/${idInvestigado}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};



//=======================================
// ANEXO EXPEDIENTE
//=======================================

export const GetAnexoExpediente = (idExpedienteInvestigacion, idAnexoExpediente) => {
	return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}/anexo-expediente/${idAnexoExpediente}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveAnexoExpediente = (idExpedienteInvestigacion, anexoExpediente) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/anexo-expediente`, anexoExpediente)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateAnexoExpediente = (idExpedienteInvestigacion, idAnexoExpediente, anexoExpediente) => {
	return Axios.put(`${apiUrl}/${idExpedienteInvestigacion}/anexo-expediente/${idAnexoExpediente}`, anexoExpediente)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteAnexoExpediente = (idExpedienteInvestigacion, idAnexoExpediente) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/anexo-expediente/${idAnexoExpediente}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// ARCHIVOS
//=======================================

export const GetArchivo = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}/archivos/${idArchivoAdjunto}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveArchivo = (idExpedienteInvestigacion, archivoAdjunto) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/archivos`, archivoAdjunto)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateArchivo = (idExpedienteInvestigacion, idArchivoAdjunto, archivoAdjunto) => {
	return Axios.put(`${apiUrl}/${idExpedienteInvestigacion}/archivos/${idArchivoAdjunto}`, archivoAdjunto)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteArchivo = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/archivos/${idArchivoAdjunto}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// REQUERIMIENTOS
//=======================================

export const GetRequerimiento = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}/requerimientos/${idArchivoAdjunto}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveRequerimiento = (idExpedienteInvestigacion, archivoAdjunto) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/requerimientos`, archivoAdjunto)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateRequerimiento = (idExpedienteInvestigacion, idArchivoAdjunto, archivoAdjunto) => {
	return Axios.put(`${apiUrl}/${idExpedienteInvestigacion}/requerimientos/${idArchivoAdjunto}`, archivoAdjunto)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteRequerimiento = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/requerimientos/${idArchivoAdjunto}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};