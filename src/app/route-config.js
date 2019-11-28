import React from 'react';
import { Route } from 'react-router';
//import { datosMaestroRoutes } from 'app/modules/datos-maestros/routes';
//import { investigacionPreliminarRoutes } from './modules/investigacion-preliminar/routes';
import { jutGestionAlertasRoutes } from './modules/jut/routes';
import { AppConfig } from 'app/core/config/app.config';
import HomeComponent from './modules/main/home';

const mainPath = {
  path: `${AppConfig.urlBaseProject}`,
  component: HomeComponent
};

const appRoutes = [
  mainPath,
  ...jutGestionAlertasRoutes
  //...datosMaestroRoutes,
  //...investigacionPreliminarRoutes
];

const AppRouting = () => (
  <>
    {appRoutes.map((x, i) => (
      <Route key={i} exact path={x.path} component={x.component} />
    ))}
  </>
);

export default AppRouting;
