import React, { useReducer, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { buildCartaInicioPad } from "../../_store/_initial-state";
import DatePicker from "app/core/components/datepicker";
import { FORM_TYPE } from "app/core/enums/enums";
import { getProp, existsProp } from "app/core/helpers";
import SelectField from "app/core/components/select-field";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { UploadTempFile } from "app/core/api/file-upload.api";
import toast from "app/core/components/toast";
import DividerTitle from "app/core/components/divider-title";
import {
  URL_AUTOCOMPLETE_EMPLEADOS,
  FetchTipoSancion
} from "app/core/api/maestros.api";
import Autocomplete from "app/core/components/autocomplete";
import ButtonUploadPdf from "app/core/components/_bussiness/button-upload-pdf";
import {
  FormCartaInicioPadReducer,
  CHANGE_INPUT,
  SET_FORM
} from "./_reducers/form-carta-inicio-pad.reducer";
import ModalFormContainer from "app/core/components/modal-form-container";
import confirm from "app/core/components/confirm";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import { AppConfig } from "app/core/config/app.config";

const useStyles = makeStyles(theme => ({
  buttonDownload: {
    padding: 0,
    margin: 0
  }
}));

const defaultListTipoSancion = {
  value: [],
  loading: false
};

const loadTiposSancion = (list, setList) => {
  setList({ ...list, loading: true });
  FetchTipoSancion().then(tipoSancion => {
    setList({ loading: false, value: tipoSancion });
  });
};

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
 *  modal: import('../../_store/_initial-state').modalCartaInicioPad,
 *  store: import('../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const FormCartaInicioPad = ({ modal, store }) => {
  /**
   * @type [import("../../_store/_initial-state").IFormCartaInicioPad]
   */
  const [form, dispatch] = useReducer(
    FormCartaInicioPadReducer,
    buildCartaInicioPad()
  );

  const [loadingFile, setLoadingFile] = useState(false);
  const [listTiposSancion, setListTiposSancion] = useState(
    defaultListTipoSancion
  );

  const classes = useStyles();

  useEffect(() => {
    if (modal.idCartaInicioPad != null) {
      store.modalCartaInicioPadActions.asyncGetCartaInicioPad(
        modal.idInformePreliminar,
        modal.idCartaInicioPad
      );
    }
  }, [modal.idCartaInicioPad]);

  useEffect(() => setForm(modal.cartaInicioPad), [modal.cartaInicioPad]);

  const setForm = form => {
    dispatch(SET_FORM(form));
  };

  const setInput = (prop, value) => {
    dispatch(CHANGE_INPUT(prop, value));
  };

  const handleUploadFile = e => {
    setLoadingFile(true);
    UploadTempFile([e.target.files[0]])
      .then(resp => {
        toast("Archivo subido correctamente!", "success");
        setInput("descripcionArchivo", resp.data.files[0].tempName);
        setLoadingFile(false);
      })
      .catch(err => {
        console.error(err);
        toast("Hubo un error al subir los archivos", "error");
        setLoadingFile(false);
      });
  };

  const handleRemoveOrganoSancionador = () => {
    setInput("idOrganoSancionador", null);
    setInput("descOrganoSancionador", "");
    setInput("idCargoOrganoSancionador", "");
    setInput("descCargoOrganoSancionador", "");
  };

  const handleSave = () => {
    const onConfirm = () => {
      switch (modal.formType) {
        case FORM_TYPE.REGISTRAR:
          store.modalCartaInicioPadActions
            .asyncSaveCartaInicioPad(modal.idInformePreliminar, form)
            .then(id => {
              store.containerInformePreliminarActions.setIdCartaInicioPad(id);
              store.containerEtapasActions.setActiveEtapa2({
                idTipoSancion: form.idTipoSancion,
                idOrganoInstructor: modal.organoInstructor.idOrganoInstructor,
                descOrganoInstructor:
                  modal.organoInstructor.descOrganoInstructor,
                idCargoOrganoInstructor:
                  modal.organoInstructor.idCargoOrganoInstructor,
                descCargoOrganoInstructor:
                  modal.organoInstructor.descCargoOrganoInstructor,
                idOrganoSancionador: form.idOrganoSancionador,
                descOrganoSancionador: form.descOrganoSancionador,
                idCargoOrganoSancionador: form.idCargoOrganoSancionador,
                descCargoOrganoSancionador: form.descCargoOrganoSancionador
              });
            });
          break;
        case FORM_TYPE.EDITAR:
          store.modalCartaInicioPadActions
            .asyncUpdateCartaInicioPad(
              modal.idInformePreliminar,
              modal.idCartaInicioPad,
              form
            )
            .then(() => {
              console.log("actualizado");
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

  const handleOpenModalDestinoNotificacion = () => {
    const {
      descOrganoInstructor,
      descCargoOrganoInstructor
    } = modal.organoInstructor;

    const autoridadCompetente = {
      descripcion: `${descOrganoInstructor} ${descCargoOrganoInstructor}`
    };

    if (!modal.cartaInicioPad.idDestinoNotificacion) {
      store.modalDestinoNotificacionActions.openModalNew(autoridadCompetente);
    } else {
      store.modalDestinoNotificacionActions.openModalUpdate(
        autoridadCompetente,
        modal.cartaInicioPad.idDestinoNotificacion
      );
    }
  };

  const handleDownloadFile = name => {
    window.location.href = `${AppConfig.urlFileServer}${name}`;
  };

  return (
    <ModalFormContainer
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalCartaInicioPadActions.closeModal
      )}
      title={modal.title}
      onEnter={() => {
        loadTiposSancion(listTiposSancion, setListTiposSancion);
      }}
      onExited={() => {
        store.modalCartaInicioPadActions.resetModal();
      }}
      onSubmit={handleSave}
      loading={modal.loading}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
      maxWidth={"lg"}
      fullWidth={true}
      buttonsSection={
        modal.idCartaInicioPad && (
          <ButtonCargoNotificacion
            onClick={handleOpenModalDestinoNotificacion}
          />
        )
      }
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <TextField
            value={form.numeroCarta}
            fullWidth
            label="Número de Carta"
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            onChange={e => setInput("numeroCarta", e.target.value)}
            helperText={getProp(modal.errors, "numeroCarta")}
            error={existsProp(modal.errors, "numeroCarta")}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DatePicker
            label="Fecha de Carta"
            value={form.fechaCarta}
            onChange={date => setInput("fechaCarta", date)}
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            fullWidth
            helperText={getProp(modal.errors, "fechaCarta")}
            error={existsProp(modal.errors, "fechaCarta")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Carta del Inicio del P.A.D"
            value={form.descripcionArchivo}
            disabled={modal.loading || loadingFile}
            InputProps={{
              endAdornment: (
                <>
                  {form.descripcionArchivo && (
                    <IconButton
                      className={classes.buttonDownload}
                      onClick={() => {
                        handleDownloadFile(form.descripcionArchivo);
                      }}
                    >
                      <Icon>cloud_download</Icon>
                    </IconButton>
                  )}
                  <ButtonUploadPdf
                    loadingFile={loadingFile}
                    onUploadFile={handleUploadFile}
                    onRemoveFile={e => setInput("descripcionArchivo", "")}
                    hasFile={form.descripcionArchivo}
                  />
                </>
              )
            }}
            helperText={getProp(modal.errors, "descripcionArchivo")}
            error={existsProp(modal.errors, "descripcionArchivo")}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            value={modal.investigados}
            fullWidth
            label="Investigado(as)"
            disabled={true}
          />
        </Grid>
      </Grid>
      <br />
      <DividerTitle title="Datos del órgano instructor" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nombre de la autoridad"
            value={modal.organoInstructor.descOrganoInstructor || ""}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cargo"
            value={modal.organoInstructor.descCargoOrganoInstructor || ""}
            disabled={true}
          />
        </Grid>
      </Grid>
      <br />
      <DividerTitle title="Datos del órgano sancionador" />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          {!form.idOrganoSancionador && modal.formType != FORM_TYPE.CONSULTAR && (
            <Autocomplete
              disabled={modal.loading}
              placeholder="Buscar órgano sancionador"
              clearOnSelect
              labelProp="nombreFormat"
              onSelect={t => {
                setInput("idOrganoSancionador", t.idEmpleado);
                setInput(
                  "descOrganoSancionador",
                  `${t.nombres} ${t.primerApellido} ${t.segundoApellido}`
                );
                setInput("idCargoOrganoSancionador", t.idCargo);
                setInput("descCargoOrganoSancionador", t.cargo);
              }}
              url={URL_AUTOCOMPLETE_EMPLEADOS}
              suggestionsProp="data.trabajadores"
              textFieldProps={{
                helperText: getProp(modal.errors, "idOrganoSancionador"),
                error: existsProp(modal.errors, "idOrganoSancionador")
              }}
            />
          )}

          {form.idOrganoSancionador && (
            <TextField
              fullWidth
              label="Nombre de la autoridad"
              value={form.descOrganoSancionador || ""}
              InputProps={{
                endAdornment: modal.formType != FORM_TYPE.CONSULTAR && (
                  <IconButton
                    disabled={modal.loading}
                    onClick={handleRemoveOrganoSancionador}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                )
              }}
              helperText={getProp(modal.errors, "idOrganoSancionador")}
              error={existsProp(modal.errors, "idOrganoSancionador")}
              disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {form.idOrganoSancionador && (
            <TextField
              fullWidth
              label="Cargo"
              value={form.descCargoOrganoSancionador || ""}
              disabled={true}
            />
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <SelectField
            fullWidth
            label="Sanción"
            value={form.idTipoSancion}
            onChange={e => setInput("idTipoSancion", e.target.value)}
            options={listTiposSancion.value}
            loading={listTiposSancion.loading}
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            helperText={getProp(modal.errors, "idTipoSancion")}
            error={existsProp(modal.errors, "idTipoSancion")}
          />
        </Grid>
      </Grid>
    </ModalFormContainer>
  );
};

export default FormCartaInicioPad;
