import Axios from "axios";
import {
	AppConfig
} from "app/core/config/app.config";

const {
	urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/etapa2`;

export const GetEtapa2 = (idExpedienteInvestigacion) => {
	return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}`)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const SaveEtapa2 = formEtapa2 => {
	return Axios.post(`${apiUrl}`, formEtapa2)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const UpdateEtapa2 = (idExpedienteInvestigacion, formEtapa2) => {
	return Axios.put(`${apiUrl}/${idExpedienteInvestigacion}`, formEtapa2)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

//=======================================
// DOCUMENTOS DESCARGO
//=======================================

export const SaveDocumentoDescargo = (idExpedienteInvestigacion, documentoDescargo) => {
	return Axios.post(`${apiUrl}/${idExpedienteInvestigacion}/documentos-descargo`, documentoDescargo)
		.then(response => response.data)
		.catch(err => {
			throw err.response;
		});
};

export const DeleteDocumentoDescargo = (idExpedienteInvestigacion, idArchivoAdjunto) => {
	return Axios.delete(`${apiUrl}/${idExpedienteInvestigacion}/documentos-descargo/${idArchivoAdjunto}`)
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