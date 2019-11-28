import Axios from "axios";
import {
    AppConfig
} from "app/core/config/app.config";

const {
    urlBaseProject: baseUrl
} = AppConfig;

const apiUrl = `${baseUrl}/api/expedientes-investigacion`;

export const GetEtapas = (idExpedienteInvestigacion) => {
    return Axios.get(`${apiUrl}/${idExpedienteInvestigacion}/etapas`)
        .then(response => response.data)
        .catch(err => {
            throw err.response;
        });
};
