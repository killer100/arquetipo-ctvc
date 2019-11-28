import React, { useReducer, useEffect } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import confirm from "app/core/components/confirm";
import DividerTitle from "app/core/components/divider-title";
import { FORM_TYPE } from "app/core/enums/enums";
import Autocomplete from "app/core/components/autocomplete";
import TextField from "@material-ui/core/TextField";
import { URL_AUTOCOMPLETE_DISTRITOS } from "app/core/api/maestros.api";
import ListAgregaAnexoNotificacion from "./list-agrega-anexo-notificacion";
import Grid from "@material-ui/core/Grid";
import { HandleOnlyNumber, getProp, existsProp } from "app/core/helpers";
import DetalleDistrito from "./detalle-distrito";

import {
  defaultState,
  ModalDestinoNotificacionReducer,
  ACTIONS
} from "./reducers/modal-destino-notificacion.reducer";
import ModalContainer from "../../modal-container";

const handleClose = (formType, close) => () => {
  if (formType == FORM_TYPE.CONSULTAR) {
    close();
  } else {
    confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
      if (confirm) close();
    });
  }
};

const ModalDestinoNotificacion = ({
  open,
  onClose,
  idExpedienteInvestigacion,
  idDestinoNotificacion,
  autoridadCompetente,
  idEstadoExpediente,
  onSaveFinish
}) => {
  /**
   * @type [import("./reducers/modal-destino-notificacion.reducer").defaultState]
   */
  const [modal, dispatch] = useReducer(
    ModalDestinoNotificacionReducer,
    defaultState
  );

  const handleEnter = () => {
    if (idDestinoNotificacion != null) {
      dispatch(ACTIONS.SET_FORM_TYPE(FORM_TYPE.EDITAR));
      ACTIONS.ASYNC_GET_NOTIFICACION(dispatch)(idDestinoNotificacion);
    }
  };

  const setInput = (prop, value) => {
    dispatch(ACTIONS.CHANGE_INPUT(prop, value));
  };

  const handleSelectDistrito = d => {
    dispatch(ACTIONS.SET_DISTRITO(d));
  };

  const handleRemoveDistrito = () => {
    dispatch(ACTIONS.CLEAR_DISTRITO());
  };

  const handleSave = () => {
    const onConfirm = () => {
      switch (modal.formType) {
        case FORM_TYPE.REGISTRAR:
          ACTIONS.ASYNC_SAVE_NOTIFICACION(dispatch)({
            ...modal.form,
            idExpedienteInvestigacion,
            idEstadoExpediente
          }).then(id => { onSaveFinish(id); onClose(); });
          break;
        case FORM_TYPE.EDITAR:
          ACTIONS.ASYNC_UPDATE_NOTIFICACION(dispatch)(idDestinoNotificacion, {
            ...modal.form,
            idEstadoExpediente
          }).then(() => {
            onClose();
            console.log("actualizado.");
          });
          break;
      }
    };

    confirm("Va a guardar el registro ¿Continuar?").then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handleAddAnexo = anexo => {
    if (idDestinoNotificacion) {
      confirm("Va a agregar el anexo. ¿Continuar?").then(confirm => {
        if (confirm) {
          ACTIONS.ASYNC_SAVE_ANEXO(dispatch)(
            idDestinoNotificacion,
            anexo
          ).then(id => {
            dispatch(
              ACTIONS.PUSH_ANEXO({
                idAnexoDestinoNotificacion: id,
                ...anexo
              })
            );
          });
        }
      });
    } else {
      dispatch(ACTIONS.PUSH_ANEXO(anexo));
    }
  };

  const handleDeleteAnexo = (rowIndex, idAnexoDestinoNotificacion) => {
    if (idAnexoDestinoNotificacion) {
      confirm("Va a eliminar el anexo. ¿Continuar?").then(confirm => {
        if (confirm) {
          ACTIONS.ASYNC_DELETE_ANEXO(dispatch)(idDestinoNotificacion, idAnexoDestinoNotificacion).then(() => {
            dispatch(ACTIONS.DELETE_ANEXO(rowIndex));
          });
        }
      });
    } else {
      dispatch(ACTIONS.DELETE_ANEXO(rowIndex));
    }
  };
  const handleReset = () => {
    dispatch(ACTIONS.RESET());
  };

  return (
    <ModalContainer
      open={open}
      onClose={handleClose(modal.formType, onClose)}
      onEnter={handleEnter}
      title={modal.title}
      onExited={handleReset}
      onSave={handleSave}
      loading={modal.loading}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DividerTitle title="Datos del Cargo de Notificación" />
      <Grid container spacing={1}>
        {!modal.form.idDistrito && (
          <Grid item xs={12} md={12}>
            <Autocomplete
              disabled={modal.loading}
              placeholder="Buscar distrito"
              clearOnSelect
              labelProp="descripcionDistritoFormat"
              onSelect={handleSelectDistrito}
              url={URL_AUTOCOMPLETE_DISTRITOS}
              suggestionsProp="data.distritos"
              textFieldProps={{
                helperText: getProp(modal.errors, "idDistrito"),
                error: existsProp(modal.errors, "idDistrito")
              }}
            />
          </Grid>
        )}

        {modal.form.idDistrito && (
          <Grid item xs={12} md={12}>
            <DetalleDistrito
              descripcionRegion={modal.form.descripcionRegion}
              descripcionProvincia={modal.form.descripcionProvincia}
              descripcionDistrito={modal.form.descripcionDistrito}
              onRemoveDistrito={handleRemoveDistrito}
              loading={modal.loading}
              showRemoveButton={true}
            />
          </Grid>
        )}

        <Grid item xs={12} md={12}>
          <TextField
            value={modal.form.direccion}
            fullWidth
            label="Dirección"
            disabled={modal.loading}
            onChange={e => setInput("direccion", e.target.value)}
            helperText={getProp(modal.errors, "direccion")}
            error={existsProp(modal.errors, "direccion")}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <TextField
            value={autoridadCompetente}
            fullWidth
            label="Autoridad Competente"
            disabled={modal.loading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            value={modal.form.folio}
            fullWidth
            label="Folios"
            disabled={modal.loading}
            onChange={e =>
              HandleOnlyNumber(e, () => setInput("folio", e.target.value))
            }
            inputProps={{ maxLength: 3 }}
            helperText={getProp(modal.errors, "folio")}
            error={existsProp(modal.errors, "folio")}
          />
        </Grid>
      </Grid>

      <ListAgregaAnexoNotificacion
        onRemoveAnexo={handleDeleteAnexo}
        anexos={modal.form.anexos}
        onAddAnexo={handleAddAnexo}
        disabled={modal.loading}
      />
    </ModalContainer>
  );
};

export default ModalDestinoNotificacion;
