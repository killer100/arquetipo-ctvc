import {
	AppConfig
} from "app/core/config/app.config";
import GestionAlerta from "./gestion-alerta/gestion-alerta.container";

const parentRoute = `${AppConfig.urlBaseProject}/jut`;

export const jutGestionAlertasRoutes = [{
		path: `${parentRoute}/alertas`,
		component: GestionAlerta
	}
	// {
	//   path: `${parentRoute}/:idExpedienteInvestigacion/informe-preliminar`,
	//   component: FormularioInformePreliminarContainer
	// },
	// {
	//   path: `${parentRoute}/:idExpedienteInvestigacion/informe-preliminar/:idInformePreliminar`,
	//   component: FormularioInformePreliminarContainer
	// }
];