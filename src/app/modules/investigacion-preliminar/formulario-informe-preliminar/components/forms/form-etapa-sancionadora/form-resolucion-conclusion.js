import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DatePicker from "app/core/components/datepicker";
import ButtonUpDownPdf from "app/core/components/_bussiness/button-up-down-pdf";
import { existsProp, getProp, HandleOnlyNumber } from "app/core/helpers";
import { FORM_TYPE } from "app/core/enums/enums";
import DividerTitle from "app/core/components/divider-title";
import TextfieldBuscarTrabajador from "app/core/components/_bussiness/textfield-buscar-trabajador";
import { TIPO_SANCION } from "app/core/enums/bussiness/enums";
import CheckboxControl from "app/core/components/checkbox-control";
import { ACTIONS } from "../_reducers/container-resolucion-conclusion.reducer";
import Show from "app/core/components/show";
import SelectField from "app/core/components/select-field";
import ModalDestinoNotificacion from "app/core/components/_bussiness/modal-destino-notificacion";

/**
 *
 * @param {{
 *  container: import('../_reducers/container-resolucion-conclusion.reducer').defaultState,
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const FormResolucionConclusion = ({
  idExpedienteInvestigacion,
  container,
  dispatch,
  etapasContainer,
  store
}) => {
  const readonly = container.formType == FORM_TYPE.CONSULTAR;

  const mostrarDiasSuspension = etapasContainer.etapas.idTipoSancion == TIPO_SANCION.SUSPENSION;

  useEffect(() => {
    const { idResolucionConclusion } = etapasContainer.etapas.etapa3;
    if (idResolucionConclusion != undefined && idResolucionConclusion != null) {
      dispatch(ACTIONS.SET_FORM_TYPE(FORM_TYPE.CONSULTAR));
      ACTIONS.ASYNC_GET_RESOLUCION_CONCLUSION(dispatch)(idResolucionConclusion);
    }
    ACTIONS.ASYNC_GET_INVESTIGADOS(dispatch)(idExpedienteInvestigacion);
    ACTIONS.ASYNC_FETCH_TIPOS_SANCION(dispatch);
    dispatch(ACTIONS.SET_DEFAULT_ORGANOS(etapasContainer.etapas));
  }, [etapasContainer.etapas.etapa3.idResolucionConclusion]);

  const handleChangeDiasSuspension = e => {
    HandleOnlyNumber(e, () => setInput("diasSuspension", e.target.value));
  };

  const setInput = (prop, value) => {
    dispatch(ACTIONS.SET_INPUT(prop, value));
  };

  const handleCloseModalNotificacion = () => {
    dispatch(ACTIONS.CLOSE_MODAL_NOTIFICACION());
  };

  const handleSetIdDestinoNotificacion = idDestinoNotificacion => {
    console.log(idDestinoNotificacion);
    store.containerEtapasActions.setIdDestinoNotificacionEtapa3(
      idDestinoNotificacion
    );
  };

  const handleRemoveOrganoSancionador = () => {
    setInput("idOrganoSancionador", null);
    setInput("descOrganoSancionador", "");
    setInput("idCargoOrganoSancionador", "");
    setInput("descCargoOrganoSancionador", "");
  };

  const handleSelectOrganoSancionador = t => {
    setInput("idOrganoSancionador", t.idEmpleado);
    setInput("descOrganoSancionador", t.nombreFormat);
    setInput("idCargoOrganoSancionador", t.idCargo);
    setInput("descCargoOrganoSancionador", t.cargo);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <TextField
            value={container.form.numeroResolucion}
            fullWidth
            label="Número de Resolución"
            disabled={container.loading || readonly}
            onChange={e => setInput("numeroResolucion", e.target.value)}
            helperText={getProp(container.errors, "numeroResolucion")}
            error={existsProp(container.errors, "numeroResolucion")}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DatePicker
            label="Fecha de Resolución"
            value={container.form.fechaResolucion}
            onChange={date => setInput("fechaResolucion", date)}
            disabled={container.loading || readonly}
            fullWidth
            helperText={getProp(container.errors, "fechaResolucion")}
            error={existsProp(container.errors, "fechaResolucion")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Resolución de Conclusión de PAD"
            value={container.form.nomArchivoResolucion}
            disabled={container.loading || readonly}
            InputProps={{
              endAdornment: (
                <ButtonUpDownPdf
                  showRemove={container.formType != FORM_TYPE.CONSULTAR}
                  filename={container.form.nomArchivoResolucion}
                  onRemove={e => setInput("nomArchivoResolucion", "")}
                  onUpload={filename =>
                    setInput("nomArchivoResolucion", filename)
                  }
                  inputId={"input-resolucion-conclusion"}
                ></ButtonUpDownPdf>
              )
            }}
            helperText={getProp(container.errors, "nomArchivoResolucion")}
            error={existsProp(container.errors, "nomArchivoResolucion")}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            value={container.investigados}
            fullWidth
            label="Investigado(as)"
            disabled={true}
          />
        </Grid>
      </Grid>
      <br />
      <DividerTitle title="Oficialización de Sanción" />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextfieldBuscarTrabajador
            showAutocomplete={!container.form.idOrganoSancionador}
            readonly={readonly}
            loading={container.loading}
            label={"Nombre de la autoridad"}
            placeholder={"Buscar órgano sancionador"}
            onRemove={handleRemoveOrganoSancionador}
            value={container.form.descOrganoSancionador}
            onSelect={handleSelectOrganoSancionador}
            helperText={getProp(container.errors, "idOrganoSancionador")}
            error={existsProp(container.errors, "idOrganoSancionador")}
          ></TextfieldBuscarTrabajador>
        </Grid>
        <Grid item xs={12} md={6}>
          <Show condition={container.form.idOrganoSancionador}>
            <TextField
              fullWidth
              label="Cargo"
              value={container.form.descCargoOrganoSancionador || ""}
              disabled={true}
            />
          </Show>
        </Grid>
        <Grid item xs={12} md={8}>
          <SelectField
            fullWidth
            label="Sanción"
            value={etapasContainer.etapas.idTipoSancion}
            options={container.comboLists.tipoSancion.value}
            loading={container.comboLists.tipoSancion.loading}
            disabled={true}
          />
        </Grid>
        <Show condition={mostrarDiasSuspension}>
          <Grid item xs={12} md={2}>
            <TextField
              value={container.form.diasSuspension}
              fullWidth
              label="Días de Suspensión"
              disabled={container.loading || readonly}
              onChange={handleChangeDiasSuspension}
              helperText={getProp(container.errors, "diasSuspension")}
              error={existsProp(container.errors, "diasSuspension")}
            />
          </Grid>
        </Show>
        <Grid item xs={12} md={2}>
          <CheckboxControl
            label="Archivado"
            checked={container.form.esArchivado}
            onChange={e => setInput("esArchivado", e.target.checked)}
            value="checked"
            color="primary"
            disabled={container.loading || readonly}
          />
        </Grid>
      </Grid>

      <ModalDestinoNotificacion
        open={container.modalNotificacion.open}
        onClose={handleCloseModalNotificacion}
        idExpedienteInvestigacion={idExpedienteInvestigacion}
        idDestinoNotificacion={
          etapasContainer.etapas.etapa3.idDestinoNotificacion
        }
        autoridadCompetente={container.form.descOrganoSancionador}
        //idEstadoExpediente={etapasContainer.etapas.idTipoSancion == 1 ? 6 : 3}
        idEstadoExpediente={4}
        onSaveFinish={handleSetIdDestinoNotificacion}
      ></ModalDestinoNotificacion>
    </>
  );
};

export default FormResolucionConclusion;
