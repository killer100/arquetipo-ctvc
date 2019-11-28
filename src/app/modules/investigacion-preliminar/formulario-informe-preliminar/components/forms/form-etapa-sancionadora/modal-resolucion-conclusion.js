import React, { useReducer, useState, useEffect } from "react";
import { FORM_TYPE } from "app/core/enums/enums";
import {
  ContainerResolucionConclusionReducer,
  defaultState,
  ACTIONS
} from "../_reducers/container-resolucion-conclusion.reducer";
import FormResolucionConclusion from "./form-resolucion-conclusion";
import ModalFormContainer from "app/core/components/modal-form-container";
import confirm from "app/core/components/confirm";
import Show from "app/core/components/show";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { purple } from "@material-ui/core/colors";
import { isNullOrUndefined } from "app/core/helpers";

const buttonCargoNotificacionStyles = theme => ({
  button: {
    background: purple[500],
    color: theme.palette.common.white,
    "&:hover": {
      background: purple[900]
    }
  }
});

const ButtonCargoNotificacion = withStyles(buttonCargoNotificacionStyles)(
  ({ onClick, classes }) => (
    <Button variant="contained" onClick={onClick} className={classes.button}>
      <Icon>mail</Icon>
      Cargo Notificación
    </Button>
  )
);

/**
 *
 * @param {{
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas,
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const ModalResolucionConclusion = ({
  open,
  onClose,
  etapasContainer,
  idExpedienteInvestigacion,
  store
}) => {
  const [title, setTitle] = useState(
    "Registro de Resolución de Conclusión de PAD"
  );
  /**
   * @type [import("../_reducers/container-resolucion-conclusion.reducer").defaultState]
   */
  const [container, dispatch] = useReducer(
    ContainerResolucionConclusionReducer,
    defaultState
  );

  useEffect(() => {
    const {idResolucionConclusion} = etapasContainer.etapas.etapa3;
    if (idResolucionConclusion) {
      setTitle("Resolución de Conclusión de PAD");
      //ACTIONS.ASYNC_GET_RESOLUCION_CONCLUSION(dispatch)(idResolucionConclusion);
    }
  }, [etapasContainer.etapas.etapa3.idResolucionConclusion]);

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
              onClose();
            });
            break;
          case FORM_TYPE.EDITAR:
            ACTIONS.ASYNC_UPDATE_RESOLUCION_CONCLUSION(dispatch)(
              etapasContainer.etapas.etapa3.idResolucionConclusion,
              {
                ...container.form,
                idExpedienteInvestigacion
              }
            ).then(() => {
              onClose();
            });
            break;
        }
      }
    });
  };

  const handleExited = () => {
    dispatch(ACTIONS.RESET());
  };

  const handleClose = () => {
    if (container.formType == FORM_TYPE.CONSULTAR) {
      onClose();
    } else {
      confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
        if (confirm) onClose();
      });
    }
  };

  const handleOpenModalDestinoNotificacion = () => {
    dispatch(ACTIONS.OPEN_MODAL_NOTIFICACION());
  };

  return (
    <>
      <ModalFormContainer
        open={open}
        onClose={handleClose}
        title={title}
        onExited={handleExited}
        onSubmit={handleGuardar}
        loading={container.loading}
        showSubmitButton={container.formType != FORM_TYPE.CONSULTAR}
        maxWidth={"lg"}
        fullWidth={true}
        buttonsSection={
          <Show
            condition={!isNullOrUndefined(etapasContainer.etapas.etapa3.idResolucionConclusion)}
          >
            <ButtonCargoNotificacion
              onClick={handleOpenModalDestinoNotificacion}
            />
          </Show>
        }
      >
        <FormResolucionConclusion
          idExpedienteInvestigacion={idExpedienteInvestigacion}
          container={container}
          dispatch={dispatch}
          etapasContainer={etapasContainer}
          store={store}
        ></FormResolucionConclusion>
      </ModalFormContainer>
    </>
  );
};

export default ModalResolucionConclusion;
