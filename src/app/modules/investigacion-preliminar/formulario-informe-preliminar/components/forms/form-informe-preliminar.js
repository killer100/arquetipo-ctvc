import React, { useReducer, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { buildInformePreliminar } from "../../_store/_initial-state";
import {
  FormInformePreliminarReducer,
  SET_FORM,
  CHANGE_INPUT,
  DELETE_FALTA,
  PUSH_FALTA
} from "./_reducers/form-informe-preliminar.reducer";
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
  FetchEstadosInformePreliminar
} from "app/core/api/maestros.api";
import Autocomplete from "app/core/components/autocomplete";
import GridFaltaTipificada from "../grids/grid-falta-tipificada";
import ButtonsFormIp from "../buttons/buttons-form-ip";
import ButtonUploadPdf from "app/core/components/_bussiness/button-upload-pdf";
import ModalAgregaFalta from "../modal/modal-agrega-falta";
import confirm from "app/core/components/confirm";
import { GetInvestigados } from "../../api/informe-preliminar.api";
import { AppConfig } from "app/core/config/app.config";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonDownload: {
    padding: 0,
    margin: 0
  }
}));

const ESTADO_INFORME_PRELIMINAR = {
  INICIO_PAD: 1,
  NO_HA_LUGAR: 2
};

const defaultListEstadosIp = {
  value: [],
  loading: false
};

const loadEstadosIp = (list, setList) => {
  setList({ ...list, loading: true });
  FetchEstadosInformePreliminar().then(cargos => {
    setList({ loading: false, value: cargos });
  });
};
/**
 *
 * @param {{
 *  container: import('../../_store/_initial-state').containerInformePreliminar,
 *  store: import('../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const FormInformePreliminar = ({
  container,
  store,
  idExpedienteInvestigacion,
  onSaveFinish,
  onCancel
}) => {
  /**
   * @type [import("../../_store/_initial-state").IFormInformePreliminar]
   */
  const [form, dispatch] = useReducer(
    FormInformePreliminarReducer,
    buildInformePreliminar()
  );

  const [listEstadosIp, setListEstadosIp] = useState(defaultListEstadosIp);
  const [loadingFile, setLoadingFile] = useState(false);
  const [investigados, setInvestigados] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (container.idInformePreliminar != null) {
      store.containerInformePreliminarActions.asyncGetInformePreliminar(
        container.idInformePreliminar,
        idExpedienteInvestigacion
      );
    }
  }, [container.idInformePreliminar]);

  useEffect(() => setForm(container.informePreliminar), [
    container.informePreliminar
  ]);

  useEffect(() => {
    if (idExpedienteInvestigacion) {
      GetInvestigados(idExpedienteInvestigacion).then(resp => {
        const investigados = resp.data.investigados
          .map(x => `${x.nombres} ${x.primerApellido} ${x.segundoApellido}`)
          .join(", ");
        setInvestigados(investigados);
      });

      loadEstadosIp(listEstadosIp, setListEstadosIp);
    }
  }, [idExpedienteInvestigacion]);

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

  const handleRemoveOrganoInstructor = () => {
    setInput("idOrganoInstructor", null);
    setInput("descOrganoInstructor", "");
    setInput("idCargoOrganoInstructor", "");
    setInput("descCargoOrganoInstructor", "");
  };

  const handleAddModalAgregaFalta = falta => {
    if (form.faltas.filter(x => x.idFalta == falta.idFalta).length > 0) {
      toast("Ya se agregó la falta seleccionada", "warning");
      return false;
    }

    if (container.idInformePreliminar) {
      confirm("Va a agregar la falta. ¿Continuar?").then(confirm => {
        if (confirm) {
          store.containerInformePreliminarActions
            .asyncSaveFalta(container.idInformePreliminar, {
              idFalta: falta.idFalta
            })
            .then(resp => {
              dispatch(
                PUSH_FALTA({
                  idFaltaTipificada: resp.data.id,
                  idFalta: falta.idFalta,
                  falta
                })
              );
              store.containerInformePreliminarActions.closeModalFalta();
            });
        }
      });
    } else {
      dispatch(PUSH_FALTA({ idFalta: falta.idFalta, falta }));
      store.containerInformePreliminarActions.closeModalFalta();
    }
  };

  const handleDeleteFalta = (rowIndex, falta) => {
    if (falta.idFaltaTipificada) {
      confirm("Va a eliminar la falta. ¿Continuar?").then(confirm => {
        if (confirm) {
          store.containerInformePreliminarActions
            .asyncDeleteFalta(
              container.idInformePreliminar,
              falta.idFaltaTipificada
            )
            .then(() => {
              dispatch(DELETE_FALTA(rowIndex));
            });
        }
      });
    } else {
      dispatch(DELETE_FALTA(rowIndex));
    }
  };

  const handleSave = () => {
    const onConfirm = () => {
      if (!container.idInformePreliminar) {
        store.containerInformePreliminarActions
          .asyncSaveInformePreliminar(idExpedienteInvestigacion, form)
          .then(id => {
            onSaveFinish(id);
          });
      } else {
        store.containerInformePreliminarActions
          .asyncUpdateInformePreliminar(container.idInformePreliminar, form)
          .then(() => {
            console.log("actualizado");
          });
      }
    };

    confirm("Va a guardar el registro ¿Continuar?").then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handleCancel = () => {
    confirm("Va a salir del formulario. ¿Continuar?").then(c => {
      if (c) onCancel();
    });
  };

  const handleOpenModalInicioPad = () => {
    const organoInstructor = {
      idOrganoInstructor: container.informePreliminar.idOrganoInstructor,
      descOrganoInstructor: container.informePreliminar.descOrganoInstructor,
      idCargoOrganoInstructor:
        container.informePreliminar.idCargoOrganoInstructor,
      descCargoOrganoInstructor:
        container.informePreliminar.descCargoOrganoInstructor
    };

    if (!container.informePreliminar.idCartaInicioPad) {
      store.modalCartaInicioPadActions.openModalNew(
        organoInstructor,
        investigados,
        container.idInformePreliminar
      );
    } else {
      store.modalCartaInicioPadActions.openModalUpdate(
        organoInstructor,
        investigados,
        container.informePreliminar.idCartaInicioPad,
        container.idInformePreliminar
      );
    }
  };

  const handleDownloadFile = name => {
    window.location.href = `${AppConfig.urlFileServer}${name}`;
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <TextField
            value={form.numeroInforme}
            fullWidth
            label="Número de Informe"
            disabled={
              container.loading || container.formType == FORM_TYPE.CONSULTAR
            }
            onChange={e => setInput("numeroInforme", e.target.value)}
            helperText={getProp(container.errors, "numeroInforme")}
            error={existsProp(container.errors, "numeroInforme")}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <DatePicker
            label="Fecha de Informe"
            value={form.fechaInforme}
            onChange={date => setInput("fechaInforme", date)}
            disabled={
              container.loading || container.formType == FORM_TYPE.CONSULTAR
            }
            fullWidth
            helperText={getProp(container.errors, "fechaInforme")}
            error={existsProp(container.errors, "fechaInforme")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            fullWidth
            label="Estado del I.P"
            value={form.idEstadoInformePreliminar}
            onChange={e =>
              setInput("idEstadoInformePreliminar", e.target.value)
            }
            options={listEstadosIp.value}
            loading={listEstadosIp.loading}
            disabled={
              container.loading ||
              container.formType == FORM_TYPE.CONSULTAR ||
              container.idInformePreliminar != null
            }
            helperText={getProp(container.errors, "idEstadoInformePreliminar")}
            error={existsProp(container.errors, "idEstadoInformePreliminar")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Documento escaneado del I.P"
            value={form.descripcionArchivo}
            disabled={container.loading || loadingFile}
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
                    inputId="abc"
                  />
                </>
              )
            }}
            helperText={getProp(container.errors, "descripcionArchivo")}
            error={existsProp(container.errors, "descripcionArchivo")}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            value={investigados}
            fullWidth
            label="Investigado(as)"
            disabled={true}
          />
        </Grid>
      </Grid>
      <br />
      {form.idEstadoInformePreliminar != 2 && (
        <DividerTitle title="Datos del órgano instructor" />
      )}

      <Grid container spacing={1}>
        {form.idEstadoInformePreliminar != 2 && (
          <Grid item xs={12} md={6}>
            {!form.idOrganoInstructor &&
              container.formType != FORM_TYPE.CONSULTAR && (
                <Autocomplete
                  disabled={container.loading}
                  placeholder="Buscar órgano instructor"
                  clearOnSelect
                  labelProp="nombreFormat"
                  onSelect={t => {
                    setInput("idOrganoInstructor", t.idEmpleado);
                    setInput(
                      "descOrganoInstructor",
                      `${t.nombres} ${t.primerApellido} ${t.segundoApellido}`
                    );
                    setInput("idCargoOrganoInstructor", t.idCargo);
                    setInput("descCargoOrganoInstructor", t.cargo);
                  }}
                  url={URL_AUTOCOMPLETE_EMPLEADOS}
                  suggestionsProp="data.trabajadores"
                  textFieldProps={{
                    helperText: getProp(container.errors, "idOrganoInstructor"),
                    error: existsProp(container.errors, "idOrganoInstructor")
                  }}
                />
              )}

            {form.idOrganoInstructor && (
              <TextField
                fullWidth
                label="Nombre de la autoridad"
                value={form.descOrganoInstructor || ""}
                InputProps={{
                  endAdornment: container.formType != FORM_TYPE.CONSULTAR && (
                    <IconButton
                      disabled={container.loading}
                      onClick={handleRemoveOrganoInstructor}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  )
                }}
                helperText={getProp(container.errors, "idOrganoInstructor")}
                error={existsProp(container.errors, "idOrganoInstructor")}
                disabled={
                  container.loading || container.formType == FORM_TYPE.CONSULTAR
                }
              />
            )}
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          {form.idOrganoInstructor && (
            <TextField
              fullWidth
              label="Cargo"
              value={form.descCargoOrganoInstructor || ""}
              disabled={true}
            />
          )}
        </Grid>

        {form.idEstadoInformePreliminar == 1 && (
          <Grid item xs={12}>
            <GridFaltaTipificada
              isLoading={container.loading}
              onClickAdd={
                store.containerInformePreliminarActions.openModalFalta
              }
              faltas={form.faltas}
              onClickDelete={handleDeleteFalta}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            multiline
            rows="3"
            rowsMax="4"
            fullWidth
            label="Observaciones"
            value={form.observacion || ""}
            onChange={e => setInput("observacion", e.target.value)}
            disabled={
              container.loading || container.formType == FORM_TYPE.CONSULTAR
            }
            inputProps={{
              maxLength: 250
            }}
          />
        </Grid>
      </Grid>

      <ButtonsFormIp
        disabled={container.loading}
        onClickInicioPad={handleOpenModalInicioPad}
        showButtonInicioPad={
          container.idInformePreliminar &&
          container.informePreliminar.idEstadoInformePreliminar ==
            ESTADO_INFORME_PRELIMINAR.INICIO_PAD
        }
        onClickSave={handleSave}
        onClickCancelar={handleCancel}
      />
      <ModalAgregaFalta
        open={container.openModalBuscarFalta}
        onClose={store.containerInformePreliminarActions.closeModalFalta}
        onAdd={handleAddModalAgregaFalta}
      />
    </>
  );
};

export default FormInformePreliminar;
