import AbogadoContainer from "./abogado/abogado.container";
import GestionArticuloContainer from "./articulo/gestion-articulo.container";
import GestionCapituloContainer from "./capitulo/gestion-capitulo.container";
import GestionNormaContainer from "./norma/gestion-norma.container";
import GestionTituloContainer from "./titulo/gestion-titulo.container";
import GestionFaltaContainer from "./falta/gestion-falta.container";
import { AppConfig } from "app/core/config/app.config";

const parentRoute = `${AppConfig.urlBaseProject}/datos-maestros`;

export const datosMaestroRoutes = [
  {
    path: `${parentRoute}/abogados`,
    component: AbogadoContainer
  },
  {
    path: `${parentRoute}/normas`,
    component: GestionNormaContainer
  },
  {
    path: `${parentRoute}/titulos`,
    component: GestionTituloContainer
  },
  {
    path: `${parentRoute}/capitulos`,
    component: GestionCapituloContainer
  },
  {
    path: `${parentRoute}/articulos`,
    component: GestionArticuloContainer
  },
  {
    path: `${parentRoute}/faltas`,
    component: GestionFaltaContainer
  }
];
