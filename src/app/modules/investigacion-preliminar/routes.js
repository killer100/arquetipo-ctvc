import GestionInvestigacionContainer from "./gestion-investigacion/gestion-investigacion.container";
import { AppConfig } from "app/core/config/app.config";
import FormularioInformePreliminarContainer from "./formulario-informe-preliminar/formulario-informe-preliminar.container";

const parentRoute = `${AppConfig.urlBaseProject}/investigacion`;

export const investigacionPreliminarRoutes = [
  { path: `${parentRoute}`, component: GestionInvestigacionContainer },
  {
    path: `${parentRoute}/:idExpedienteInvestigacion/etapas`, component: FormularioInformePreliminarContainer
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
