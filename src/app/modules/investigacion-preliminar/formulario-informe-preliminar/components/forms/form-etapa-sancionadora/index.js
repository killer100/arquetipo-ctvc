import React, { useReducer, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import confirm from "app/core/components/confirm";
import Show from "app/core/components/show";
import { FORM_TYPE } from "app/core/enums/enums";
import { TIPO_SANCION } from "app/core/enums/bussiness/enums";
import ContainerResolucionConclucion from "./container-resolucion-conclusion";
import TabsEtapaSancionadora from "./tabs-etapa-sancionadora";

const useStyles = makeStyles(theme => ({
  tabContainer: {
    marginTop: theme.spacing(3)
  }
}));

/**
 *
 * @param {{
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas,
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const FormEtapaSancionadora = ({
  idExpedienteInvestigacion,
  etapasContainer,
  store,
  onCancel
}) => {
  const esAmonetacion =
    etapasContainer.etapas.idTipoSancion == TIPO_SANCION.AMONESTACION;

  return (
    <>
      <Show condition={esAmonetacion}>
        <ContainerResolucionConclucion
          idExpedienteInvestigacion={idExpedienteInvestigacion}
          etapasContainer={etapasContainer}
          store={store}
          onCancel={onCancel}
        ></ContainerResolucionConclucion>
      </Show>
      <Show condition={!esAmonetacion}>
        <TabsEtapaSancionadora
          idExpedienteInvestigacion={idExpedienteInvestigacion}
          etapasContainer={etapasContainer}
          onCancel={onCancel}
          store={store}
        ></TabsEtapaSancionadora>
      </Show>
    </>
  );
};

export default FormEtapaSancionadora;
