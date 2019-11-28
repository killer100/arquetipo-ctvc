import React, { useReducer, useEffect } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import confirm from "app/core/components/confirm";
import DividerTitle from "app/core/components/divider-title";
import { FORM_TYPE } from "app/core/enums/enums";
import Autocomplete from "app/core/components/autocomplete";
import TextField from "@material-ui/core/TextField";
import DetalleDistrito from "../misc/detalle-distrito";
import { buildDestinoNotificacion } from "../../_store/_initial-state";
import { URL_AUTOCOMPLETE_DISTRITOS } from "app/core/api/maestros.api";
import {
  SET_FORM,
  CHANGE_INPUT,
  FormDestinoNotificacionReducer,
  PUSH_ANEXO,
  DELETE_ANEXO
} from "./_reducers/form-destino-notificacion.reducer";
import ListAgregaAnexoNotificacion from "../misc/list-agrega-anexo-notificacion";
import Grid from "@material-ui/core/Grid";
import { HandleOnlyNumber, getProp, existsProp } from "app/core/helpers";

const handleClose = (formType, close) => () => {
  if (formType == FORM_TYPE.CONSULTAR) {
    close();
  } else {
    confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
      if (confirm) close();
    });
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalDestinoNotificacion,
 *  store: import('../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const FormDestinoNotificacion = ({
  modal,
  store,
  idExpedienteInvestigacion
}) => {
  /**
   * @type [import("../../_store/_initial-state").IDestinoNotificacion]
   */
  const [form, dispatch] = useReducer(
    FormDestinoNotificacionReducer,
    buildDestinoNotificacion()
  );

  useEffect(() => {
    if (modal.idDestinoNotificacion != null) {
      store.modalDestinoNotificacionActions.asyncGetDestinoNotificacion(
        modal.idDestinoNotificacion
      );
    }
  }, [modal.idDestinoNotificacion]);

  useEffect(() => setForm(modal.destinoNotificacion), [
    modal.destinoNotificacion
  ]);

  const setForm = form => {
    dispatch(SET_FORM(form));
  };

  const setInput = (prop, value) => {
    dispatch(CHANGE_INPUT(prop, value));
  };

  const handleSelectDistrito = d => {
    setInput("idRegion", d.idRegion);
    setInput("descripcionRegion", d.descripcionRegion);
    setInput("idProvincia", d.idProvincia);
    setInput("descripcionProvincia", d.descripcionProvincia);
    setInput("idDistrito", d.idDistrito);
    setInput("descripcionDistrito", d.descripcionDistrito);
  };

  const handleRemoveDistrito = () => {
    setInput("idRegion", "");
    setInput("descripcionRegion", "");
    setInput("idProvincia", "");
    setInput("descripcionProvincia", "");
    setInput("idDistrito", "");
    setInput("descripcionDistrito", "");
  };

  const handleSave = () => {
    console.log(modal.formType);
    const onConfirm = () => {
      switch (modal.formType) {
        case FORM_TYPE.REGISTRAR:
          store.modalDestinoNotificacionActions
            .asyncSaveDestinoNotificacion(idExpedienteInvestigacion, {
              ...form,
              idEstadoExpediente: 1
            })
            .then(id => {
              store.modalCartaInicioPadActions.setIdDestinoNotificacion(id);
            });
          break;
        case FORM_TYPE.EDITAR:
          store.modalDestinoNotificacionActions
            .asyncUpdateDestinoNotificacion(modal.idDestinoNotificacion, {
              ...form,
              idEstadoExpediente: 1
            })
            .then(() => {
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
    if (modal.idDestinoNotificacion) {
      confirm("Va a agregar el anexo. ¿Continuar?").then(confirm => {
        if (confirm) {
          store.modalDestinoNotificacionActions
            .asyncSaveAnexo(modal.idDestinoNotificacion, anexo)
            .then(id => {
              dispatch(
                PUSH_ANEXO({
                  idAnexoDestinoNotificacion: id,
                  ...anexo
                })
              );
            });
        }
      });
    } else {
      dispatch(PUSH_ANEXO(anexo));
    }
  };

  const handleDeleteAnexo = (rowIndex, idAnexoDestinoNotificacion) => {
    if (idAnexoDestinoNotificacion) {
      confirm("Va a eliminar el anexo. ¿Continuar?").then(confirm => {
        if (confirm) {
          store.modalDestinoNotificacionActions
            .asyncDeleteAnexo(
              modal.idDestinoNotificacion,
              idAnexoDestinoNotificacion
            )
            .then(() => {
              dispatch(DELETE_ANEXO(rowIndex));
            });
        }
      });
    } else {
      dispatch(DELETE_ANEXO(rowIndex));
    }
  };

  return (
    <ModalFormContainer
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalDestinoNotificacionActions.closeModal
      )}
      title={modal.title}
      onExited={() => {
        store.modalDestinoNotificacionActions.resetModal();
      }}
      onSubmit={handleSave}
      loading={modal.loading}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DividerTitle title="Datos del Cargo de Notificación" />
      <Grid container spacing={1}>
        {!form.idDistrito && (
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

        {form.idDistrito && (
          <Grid item xs={12} md={12}>
            <DetalleDistrito
              descripcionRegion={form.descripcionRegion}
              descripcionProvincia={form.descripcionProvincia}
              descripcionDistrito={form.descripcionDistrito}
              onRemoveDistrito={handleRemoveDistrito}
              loading={modal.loading}
              showRemoveButton={true}
            />
          </Grid>
        )}

        <Grid item xs={12} md={12}>
          <TextField
            value={form.direccion}
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
            value={modal.autoridadCompetente.descripcion}
            fullWidth
            label="Autoridad Competente"
            disabled={modal.loading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            value={form.folio}
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
        anexos={form.anexos}
        onAddAnexo={handleAddAnexo}
        disabled={modal.loading}
      />
    </ModalFormContainer>
  );
};

export default FormDestinoNotificacion;
