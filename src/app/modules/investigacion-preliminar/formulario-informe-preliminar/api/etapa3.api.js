import Axios from "axios";
import {
	AppConfig
} from "app/core/config/app.config";

const {
	urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/etapa3`;

export const GetEtapa3 = (idExpedienteInvestigacion) => {
	return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveEtapa3 = formEtapa3 => {
	return Axios.post(`${apiUrl}`, formEtapa3)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateEtapa3 = (idExpedienteInvestigacion, formEtapa3) => {
	return Axios.put(`${apiUrl}/${idExpedienteInvestigacion}`, formEtapa3)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// DOCUMENTOS DESCARGO
//=======================================

export const SaveSolicitudInformeOral = (idExpedienteInvestigacion, solicitudInformeOral) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/solicitudes-informe-oral`, solicitudInformeOral)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteSolicitudInformeOral = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/solicitudes-informe-oral/${idArchivoAdjunto}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// ACTA INFORME ORAL
//=======================================

export const SaveActaInformeOral = (idExpedienteInvestigacion, actaInformeOral) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/acta-informe-oral`, actaInformeOral)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteActaInformeOral = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/acta-informe-oral/${idArchivoAdjunto}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};