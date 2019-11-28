import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";
import { ConvertToQueryParams } from "app/core/helpers";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/destino-notificacion`;

export const GetNotificacionesPorExpedienteInvestigacion = id => {
  return Axios.get(`${apiUrl}/listar-por-expediente-investigacion/${id}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
