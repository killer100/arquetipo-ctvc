import Axios from "axios";

import {
	AppConfig
} from "app/core/config/app.config";

const {
	urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/pide`;

export const GetPersona = dni => {
	return Axios.get(`${apiUrl}/buscar-persona?dni=${dni}`)
		.then(response => {
			console.log("datos de persona", response.data);
			return response.data.data
		})
		.catch(err => {
			throw err.response;
		});
};