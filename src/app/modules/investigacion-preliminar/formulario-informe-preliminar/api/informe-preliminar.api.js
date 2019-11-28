import Axios from "axios";
import {
    AppConfig
} from "app/core/config/app.config";

const {
    urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/informe-preliminar`;

export const GetInformePreliminar = (id, idExpedienteInvestigacion) => {
    return Axios.get(`${apiUrl}/${id}`, { params: { idExpedienteInvestigacion } })
        .then(response => response.data)
        .catch(err => {
            throw err.response;
        });
};

export const SaveInformePreliminar = informePreliminar => {
    return Axios.post(`${apiUrl}`, informePreliminar)
        .then(response => response.data)
        .catch(err => {
            throw err.response;
        });
};

export const UpdateInformePreliminar = (idInformePreliminar, informePreliminar) => {
    return Axios.put(`${apiUrl}/${idInformePreliminar}`, informePreliminar)
        .then(response => response.data)
        .catch(err => {
            throw err.response;
        });
};

//=======================================
// FALTAS
//=======================================

export const SaveFalta = (idInformePreliminar, faltaTipificada) => {
	return Axios.post(`${apiUrl}/${idInformePreliminar}/faltas`, faltaTipificada)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteFalta = (idInformePreliminar, idFaltaTipificada) => {
	return Axios.delete(`${apiUrl}/${idInformePreliminar}/faltas/${idFaltaTipificada}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// CARTA INICIO PAD
//=======================================

export const GetCartaInicioPad = (idInformePreliminar, idCartaInicioPad) => {
	return Axios.get(`${apiUrl}/${idInformePreliminar}/carta-inicio-pad/${idCartaInicioPad}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveCartaInicioPad = (idInformePreliminar, cartaInicioPad) => {
	return Axios.post(`${apiUrl}/${idInformePreliminar}/carta-inicio-pad`, cartaInicioPad)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateCartaInicioPad = (idInformePreliminar, idCartaInicioPad, cartaInicioPad) => {
	return Axios.put(`${apiUrl}/${idInformePreliminar}/carta-inicio-pad/${idCartaInicioPad}`, cartaInicioPad)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// INVESTIGADOS
//=======================================

export const GetInvestigados = (idExpedienteInvestigacion) => {
	return Axios.get(`${baseUrl}/api/expedientes-investigacion/${idExpedienteInvestigacion}/investigados`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};