import React, { useState, useEffect, useReducer } from "react";
import { FORM_TYPE } from "app/core/enums/enums";
import ModalFormContainer from "app/core/components/modal-form-container";
import confirm from "app/core/components/confirm";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DatePicker from "app/core/components/datepicker";
import CheckboxControl from "app/core/components/checkbox-control";
import ButtonUpDownPdf from "app/core/components/_bussiness/button-up-down-pdf";
import DividerTitle from "app/core/components/divider-title";
import { existsProp, getProp, HandleOnlyNumber } from "app/core/helpers";
import {
  defaultModal,
  ModalInformeOrganoInstructorReducer,
  ACTIONS
} from "../_reducers/modal-informe-organo-instructor-reducer";
import TextfieldBuscarTrabajador from "app/core/components/_bussiness/textfield-buscar-trabajador";
import Show from "app/core/components/show";
import SelectField from "app/core/components/select-field";
import { TIPO_SANCION } from "app/core/enums/bussiness/enums";

// =======================================
// HELPER FUNCTIONS
// =======================================

const handleClose = (formType, close) => () => {
  if (formType == FORM_TYPE.CONSULTAR) {
    close();
  } else {
    confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
      if (confirm) close();
    });
  }
};

// =======================================
// COMPONENT
// =======================================

/**
 *
 * @param {{
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas,
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const ModalInformeOrganoInstructivo = ({
  open,
  onClose,
  onReset,
  idExpedienteInvestigacion,
  idInformeOrganoInstructivo,
  etapasContainer,
  store
}) => {
  const mostrarDiasSuspension = etapasContainer.etapas.idTipoSancion == TIPO_SANCION.SUSPENSION;
  /**
   * @type [import("../_reducers/modal-informe-organo-instructor-reducer").defaultModal]
   */
  const [modal, dispatch] = useReducer(
    ModalInformeOrganoInstructorReducer,
    defaultModal
  );
  const handleEnter = () => {
    if (
      idInformeOrganoInstructivo != undefined &&
      idInformeOrganoInstructivo != null
    ) {
      dispatch(ACTIONS.SET_FORM_TYPE(FORM_TYPE.CONSULTAR));
      dispatch(ACTIONS.SET_TITLE("Informe del Órgano Instructivo"));
      ACTIONS.ASYNC_GET_INFORME_ORGANO_INSTRUCTOR(dispatch)(
        idInformeOrganoInstructivo
      );
    }
    ACTIONS.ASYNC_GET_INVESTIGADOS(dispatch)(idExpedienteInvestigacion);
    ACTIONS.ASYNC_FETCH_TIPOS_SANCION(dispatch);
    dispatch(ACTIONS.SET_DEFAULT_ORGANOS(etapasContainer.etapas));
  };

  const setInput = (prop, value) => {
    dispatch(ACTIONS.SET_INPUT(prop, value));
  };

  const handleSave = () => {
    confirm("Va a guardar el informe. ¿Continuar?").then(c => {
      if (c) {
        switch (modal.formType) {
          case FORM_TYPE.REGISTRAR:
            ACTIONS.ASYNC_SAVE_INFORME_ORGANO_INSTRUCTOR(dispatch)({
              ...modal.form,
              idExpedienteInvestigacion
            }).then(id => {
              store.containerEtapasActions.setIdInformeOrganoInstructivoEtapa2(
                id,
                {
                  idOrganoSancionador: modal.form.idOrganoSancionador,
                  descOrganoSancionador: modal.form.descOrganoSancionador,
                  idCargoOrganoSancionador: modal.form.idCargoOrganoSancionador,
                  descCargoOrganoSancionador:
                    modal.form.descCargoOrganoSancionador
                }
              );
              onClose();
            });
            break;
          case FORM_TYPE.EDITAR:
            ACTIONS.ASYNC_UPDATE_INFORME_ORGANO_INSTRUCTOR(dispatch)(
              idInformeOrganoInstructivo,
              {
                ...modal.form,
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
    onReset();
    dispatch(ACTIONS.RESET());
  };

  const handleSelectOrganoInstructor = t => {
    setInput("idOrganoInstructor", t.idEmpleado);
    setInput("descOrganoInstructor", t.nombreFormat);
    setInput("idCargoOrganoInstructor", t.idCargo);
    setInput("descCargoOrganoInstructor", t.cargo);
  };

  const handleRemoveOrganoInstructor = () => {
    setInput("idOrganoInstructor", null);
    setInput("descOrganoInstructor", "");
    setInput("idCargoOrganoInstructor", "");
    setInput("descCargoOrganoInstructor", "");
  };

  const handleSelectOrganoSancionador = t => {
    setInput("idOrganoSancionador", t.idEmpleado);
    setInput("descOrganoSancionador", t.nombreFormat);
    setInput("idCargoOrganoSancionador", t.idCargo);
    setInput("descCargoOrganoSancionador", t.cargo);
  };

  const handleRemoveOrganoSancionador = () => {
    setInput("idOrganoSancionador", null);
    setInput("descOrganoSancionador", "");
    setInput("idCargoOrganoSancionador", "");
    setInput("descCargoOrganoSancionador", "");
  };

  const handleChangeDiasSuspension = e => {
    HandleOnlyNumber(e, () => setInput("diasSuspension", e.target.value));
  };

  return (
    <>
      <ModalFormContainer
        open={open}
        onClose={handleClose(modal.formType, onClose)}
        title={modal.title}
        onEnter={handleEnter}
        onExited={handleExited}
        onSubmit={handleSave}
        loading={modal.loading}
        showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
        maxWidth={"lg"}
        fullWidth={true}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <TextField
              value={modal.form.numeroInforme}
              fullWidth
              label="Número de Informe"
              disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
              onChange={e => setInput("numeroInforme", e.target.value)}
              helperText={getProp(modal.errors, "numeroInforme")}
              error={existsProp(modal.errors, "numeroInforme")}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              value={modal.form.fechaInforme}
              fullWidth
              label="Fecha de Informe"
              disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
              onChange={date => setInput("fechaInforme", date)}
              helperText={getProp(modal.errors, "fechaInforme")}
              error={existsProp(modal.errors, "fechaInforme")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Informe del Órgano Instructor"
              value={modal.form.nomArchivoInforme}
              disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
              InputProps={{
                endAdornment: (
                  <ButtonUpDownPdf
                    showRemove={modal.formType != FORM_TYPE.CONSULTAR}
                    filename={modal.form.nomArchivoInforme}
                    onRemove={e => setInput("nomArchivoInforme", "")}
                    onUpload={filename =>
                      setInput("nomArchivoInforme", filename)
                    }
                    inputId={"input-organo-instructor"}
                  ></ButtonUpDownPdf>
                )
              }}
              helperText={getProp(modal.errors, "nomArchivoInforme")}
              error={existsProp(modal.errors, "nomArchivoInforme")}
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
            <TextfieldBuscarTrabajador
              showAutocomplete={!modal.form.idOrganoInstructor}
              readonly={modal.formType == FORM_TYPE.CONSULTAR}
              loading={modal.loading}
              label={"Nombre de la autoridad"}
              placeholder={"Buscar órgano instructor"}
              onRemove={handleRemoveOrganoInstructor}
              value={modal.form.descOrganoInstructor}
              onSelect={handleSelectOrganoInstructor}
              helperText={getProp(modal.errors, "idOrganoInstructor")}
              error={existsProp(modal.errors, "idOrganoInstructor")}
            ></TextfieldBuscarTrabajador>
          </Grid>
          <Grid item xs={12} md={6}>
            <Show condition={modal.form.idOrganoInstructor}>
              <TextField
                fullWidth
                label="Cargo"
                value={modal.form.descCargoOrganoInstructor || ""}
                disabled={true}
              />
            </Show>
          </Grid>
        </Grid>

        <br />
        <DividerTitle title="Datos del órgano sancionador" />

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextfieldBuscarTrabajador
              showAutocomplete={!modal.form.idOrganoSancionador}
              readonly={modal.formType == FORM_TYPE.CONSULTAR}
              loading={modal.loading}
              label={"Nombre de la autoridad"}
              placeholder={"Buscar órgano sancionador"}
              onRemove={handleRemoveOrganoSancionador}
              value={modal.form.descOrganoSancionador}
              onSelect={handleSelectOrganoSancionador}
              helperText={getProp(modal.errors, "idOrganoSancionador")}
              error={existsProp(modal.errors, "idOrganoSancionador")}
            ></TextfieldBuscarTrabajador>
          </Grid>
          <Grid item xs={12} md={6}>
            <Show condition={modal.form.idOrganoSancionador}>
              <TextField
                fullWidth
                label="Cargo"
                value={modal.form.descCargoOrganoSancionador || ""}
                disabled={true}
              />
            </Show>
          </Grid>
          <Grid item xs={12} md={8}>
            <SelectField
              fullWidth
              label="Sanción"
              value={etapasContainer.etapas.idTipoSancion}
              options={modal.comboLists.tipoSancion.value}
              loading={modal.comboLists.tipoSancion.loading}
              disabled={true}
            />
          </Grid>
          <Show condition={mostrarDiasSuspension}>
            <Grid item xs={12} md={2}>
              <TextField
                value={modal.form.diasSuspension}
                fullWidth
                label="Días de Suspensión"
                disabled={
                  modal.loading || modal.formType == FORM_TYPE.CONSULTAR
                }
                onChange={handleChangeDiasSuspension}
                helperText={getProp(modal.errors, "diasSuspension")}
                error={existsProp(modal.errors, "diasSuspension")}
              />
            </Grid>
          </Show>
          <Grid item xs={12} md={2}>
            <CheckboxControl
              label="Archivado"
              checked={modal.form.esArchivado}
              onChange={e => setInput("esArchivado", e.target.checked)}
              value="checked"
              color="primary"
              disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            />
          </Grid>
        </Grid>
      </ModalFormContainer>
    </>
  );
};

export default ModalInformeOrganoInstructivo;
