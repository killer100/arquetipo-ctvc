import React, { useReducer, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  defaultModal,
  ModalListaNotificacionReducer,
  ACTIONS
} from "./reducers/modal-lista-notificacion.reducer";
import ModalContainer from "../../modal-container";

const ModalDestinoNotificacion = ({
  open,
  onClose,
  idExpedienteInvestigacion
}) => {
  /**
   * @type [import("./reducers/modal-lista-notificacion.reducer").defaultModal]
   */
  const [modal, dispatch] = useReducer(
    ModalListaNotificacionReducer,
    defaultModal
  );

  const handleEnter = () => {
    if (idExpedienteInvestigacion != null) {
      ACTIONS.ASYNC_GET_NOTIFICACIONES(dispatch)(idExpedienteInvestigacion);
    }
  };

  const handleReset = () => {
    dispatch(ACTIONS.RESET());
  };

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      onEnter={handleEnter}
      title={modal.title}
      onExited={handleReset}
      onSave={handleSave}
      loading={modal.loading}
      showSubmitButton={false}
      maxWidth={"md"}
      fullWidth={true}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </ModalContainer>
  );
};

export default ModalDestinoNotificacion;
