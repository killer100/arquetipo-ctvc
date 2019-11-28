import Axios from "axios";
import {
	AppConfig
} from "app/core/config/app.config";

const {
	urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/destino-notificacion`;

export const GetDestinoNotificacion = (id) => {
	return Axios.get(`${apiUrl}/${id}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveDestinoNotificacion = destinoNotificacion => {
	return Axios.post(`${apiUrl}`, destinoNotificacion)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateDestinoNotificacion = (idDestinoNotificacion, destinoNotificacion) => {
	return Axios.put(`${apiUrl}/${idDestinoNotificacion}`, destinoNotificacion)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// FALTAS
//=======================================

export const SaveAnexo = (idDestinoNotificacion, anexo) => {
	return Axios.post(`${apiUrl}/${idDestinoNotificacion}/anexos`, anexo)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteAnexo = (idDestinoNotificacion, idAnexoDestinoNotificacion) => {
	return Axios.delete(`${apiUrl}/${idDestinoNotificacion}/anexos/${idAnexoDestinoNotificacion}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};