import Axios from "axios";

import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/enumerados`;

// export const FetchDependencias = () => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve({
// 				data: {
// 					dependencias: [{
// 							value: 1,
// 							label: "dependencia 1"
// 						},
// 						{
// 							value: 2,
// 							label: "dependencia 2"
// 						},
// 						{
// 							value: 3,
// 							label: "dependencia 3"
// 						},
// 						{
// 							value: 4,
// 							label: "dependencia 4"
// 						}
// 					]
// 				}
// 			});
// 		}, 600);
// 	});
// };

// export const FetchAbogados = () => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve({
// 				data: {
// 					abogados: [{
// 							value: 1,
// 							label: "abogado 1"
// 						},
// 						{
// 							value: 2,
// 							label: "abogado 2"
// 						},
// 						{
// 							value: 3,
// 							label: "abogado 3"
// 						}
// 					]
// 				}
// 			});
// 		}, 500);
// 	});
// };

// export const FetchEstadosExpediente = () => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve({
// 				data: {
// 					estados: [{
// 							value: 1,
// 							label: "estado 1"
// 						},
// 						{
// 							value: 2,
// 							label: "estado 2"
// 						},
// 						{
// 							value: 3,
// 							label: "estado 3"
// 						}
// 					]
// 				}
// 			});
// 		}, 700);
// 	});
// };

// export const FetchCargos = () => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve({
// 				data: {
// 					cargos: [{
// 							value: 1,
// 							label: "cargo 1"
// 						},
// 						{
// 							value: 2,
// 							label: "cargo 2"
// 						},
// 						{
// 							value: 3,
// 							label: "cargo 3"
// 						},
// 						{
// 							value: 4,
// 							label: "cargo 4"
// 						}
// 					]
// 				}
// 			});
// 		}, 600);
// 	});
// };

export const URL_AUTOCOMPLETE_EMPLEADOS = `${apiUrl}/trabajadores`;
export const URL_AUTOCOMPLETE_FALTAS = `${apiUrl}/faltas`;
export const URL_AUTOCOMPLETE_DISTRITOS = `${apiUrl}/distritos`;

export const FetchDependencias = () => {
  return Axios.get(`${apiUrl}/dependencias`)
    .then(response => {
        return response.data.data.dependencias.map(x => ({
            ...x, 
            label: x.descripcion, 
            value: x.idDependencia
        }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const FetchCargos = () => {
  return Axios.get(`${apiUrl}/cargos`)
    .then(response => {
        return response.data.data.cargos.map(x => ({
            ...x,
            label: x.descripcion,
            value: x.idCargo
        }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const FetchEstadosExpediente = () => {
  return Axios.get(`${apiUrl}/estados-expediente`)
    .then(response => {
        return response.data.data.estadosExpediente.map(x => ({
            ...x,
            label: x.descripcion,
            value: x.idEstadoExpediente
        }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const FetchAbogados = () => {
  const params = { page: 1, pageSize: 0 };
  return Axios.get(`${baseUrl}/api/abogados`, { params })
    .then(response => {
        return response.data.data.items.map(x => ({
            ...x,
            label: `${x.nombres} ${x.primerApellido} ${x.segundoApellido}`,
            value: x.idAbogado
        }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const FetchEstadosInformePreliminar = () => {
  return Axios.get(`${apiUrl}/estados-informe-preliminar`)
    .then(response => {
        return response.data.data.estadosInformePreliminar.map(x => ({
            ...x,
            label: x.descripcion,
            value: x.idEstadoInformePreliminar
        }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const FetchTipoSancion = () => {
  return Axios.get(`${apiUrl}/tipos-sancion`)
    .then(response => {
        return response.data.data.tiposSancion.map(x => ({
            ...x,
            label: x.descripcion,
            value: x.idTipoSancion
        }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};