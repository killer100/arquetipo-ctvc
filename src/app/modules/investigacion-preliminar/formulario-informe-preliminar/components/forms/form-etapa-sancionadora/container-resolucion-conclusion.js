import React, { useEffect, useReducer } from "react";
import {
  ContainerResolucionConclusionReducer,
  defaultState,
  ACTIONS
} from "../_reducers/container-resolucion-conclusion.reducer";
import FormResolucionConclusion from "./form-resolucion-conclusion";
import ButtonsEtapaSancionadora from "./buttons-etapa-sancionadora";
import confirm from "app/core/components/confirm";
import { FORM_TYPE } from "app/core/enums/enums";

/**
 *
 * @param {{
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas,
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const ContainerResolucionConclucion = ({
  store,
  etapasContainer,
  idExpedienteInvestigacion,
  onCancel
}) => {
  /**
   * @type [import("../_reducers/container-resolucion-conclusion.reducer").defaultState]
   */
  const [container, dispatch] = useReducer(
    ContainerResolucionConclusionReducer,
    defaultState
  );

  // useEffect(() => {
  //   const { idResolucionConclusion } = etapasContainer.etapas.etapa3;
  //   if (idResolucionConclusion) {
  //     ACTIONS.ASYNC_GET_RESOLUCION_CONCLUSION(dispatch)(idResolucionConclusion);
  //   }
  // }, []);

  const handleGuardar = () => {
    confirm("Va a guardar la resolución. ¿Continuar?").then(c => {
      if (c) {
        switch (container.formType) {
          case FORM_TYPE.REGISTRAR:
            ACTIONS.ASYNC_SAVE_RESOLUCION_CONCLUSION(dispatch)({
              ...container.form,
              idExpedienteInvestigacion
            }).then(id => {
              store.containerEtapasActions.setIdResolucionConclusionEtapa3(id);
            });
            break;
          case FORM_TYPE.EDITAR:
            ACTIONS.ASYNC_UPDATE_RESOLUCION_CONCLUSION(dispatch)(
              etapasContainer.etapas.etapa3.idResolucionConclusion,
              {
                ...container.form,
                idExpedienteInvestigacion
              }
            );
            break;
        }
      }
    });
  };

  const handleCancelar = () => {
    confirm("Va a salir del formulario. ¿Continuar?").then(c => {
      if (c) onCancel();
    });
  };

  const handleOpenModalNotificacion = () => {
    dispatch(ACTIONS.OPEN_MODAL_NOTIFICACION());
  };

  return (
    <>
      <FormResolucionConclusion
        idExpedienteInvestigacion={idExpedienteInvestigacion}
        container={container}
        dispatch={dispatch}
        etapasContainer={etapasContainer}
        store={store}
      ></FormResolucionConclusion>

      <ButtonsEtapaSancionadora
        labelButtonPurple={"Cargo Notificacion"}
        showButtonPurple={etapasContainer.etapas.etapa3.idResolucionConclusion}
        onClickButtonPurple={handleOpenModalNotificacion}
        onClickCancelar={handleCancelar}
        onClickGuardar={handleGuardar}
        disabled={container.loading}
        showButtonGuardar={container.formType!=FORM_TYPE.CONSULTAR}
      ></ButtonsEtapaSancionadora>
    </>
  );
};

export default ContainerResolucionConclucion;
