import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { URL_AUTOCOMPLETE_EMPLEADOS } from "app/core/api/maestros.api";
import Autocomplete from "app/core/components/autocomplete";
import CheckboxControl from "app/core/components/checkbox-control";
import DatePicker from "app/core/components/datepicker";
import DividerTitle from "app/core/components/divider-title";
import SelectField from "app/core/components/select-field";
import { FORM_TYPE } from "app/core/enums/enums";
import { existsProp, getProp } from "app/core/helpers";
import moment from "moment";
import React, { useEffect, useState } from "react";

const addYears = (currentDate, years) => {
    return years ? moment(currentDate).add(years, "y") : null;
};

/**
 *
 * @param {{
 *  form: import('../../_store/_initial-state').IFormGestionInvestigacion,
 *  setForm: (form: import('../../_store/_initial-state').IModalGestionInvestigacion) => void
 * }} param0
 */
const FormDatosGenerales = ({
    form,
    setInput,
    loading,
    filterLists,
    formType,
    errors,
    disabledFormChanges
}) => {

    useEffect(() => {
        if (!disabledFormChanges) {
            if (form.tiempoPrescripcion) {
                setInput(
                    "fechaPrescripcion",
                    addYears(form.fechaRecepcion, form.tiempoPrescripcion)
                );
            }
        }
    }, [form.fechaRecepcion]);

    useEffect(() => {
        if (!disabledFormChanges) {
            setInput(
                "fechaPrescripcion",
                addYears(form.fechaRecepcion, form.tiempoPrescripcion)
            );
        }
    }, [form.tiempoPrescripcion]);

    useEffect(() => {
        if (!disabledFormChanges) {
            if (form.esDenuncianteExterno) {
                handleRemoveTrabajadorDenunciante();
            } else {
                setInput("externoDenunciante", "");
            }
        }
    }, [form.esDenuncianteExterno]);

    const handleRemoveTrabajadorDenunciante = () => {
        setInput("idTrabajadorDenunciante", null);
        setInput("nombreDenunciante", "");
        setInput("dependenciaDenunciante", "");
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <DatePicker
                        label="Fecha Recep. UGTH"
                        value={form.fechaRecepcion}
                        onChange={date => setInput("fechaRecepcion", date)}
                        disabled={loading || formType == FORM_TYPE.CONSULTAR}
                        fullWidth
                        helperText={getProp(errors, "fechaRecepcion")}
                        error={existsProp(errors, "fechaRecepcion")}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <SelectField
                        fullWidth
                        label="Tiempo de Presc.(años)"
                        value={form.tiempoPrescripcion}
                        onChange={e => setInput("tiempoPrescripcion", e.target.value)}
                        options={filterLists.tiempoPrescripcion.value}
                        loading={filterLists.tiempoPrescripcion.loading}
                        disabled={!form.fechaRecepcion || loading || formType == FORM_TYPE.CONSULTAR} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <DatePicker
                        label="Fecha Prescrip. IP"
                        disabled={true}
                        fullWidth
                        value={form.fechaPrescripcion}
                        disableFuture={false}
                        helperText={getProp(errors, "fechaPrescripcion")}
                        error={existsProp(errors, "fechaPrescripcion")}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <CheckboxControl
                        label="Expediente de corrupción"
                        checked={form.expedienteCorrupcion}
                        onChange={e => setInput("expedienteCorrupcion", e.target.checked)}
                        value="checked"
                        color="primary"
                        disabled={loading || formType == FORM_TYPE.CONSULTAR}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectField
                        fullWidth
                        label="Abogado Responsable"
                        value={form.idAbogado}
                        onChange={e => setInput("idAbogado", e.target.value)}
                        options={filterLists.abogado.value}
                        loading={filterLists.abogado.loading}
                        helperText={getProp(errors, "idAbogado")}
                        error={existsProp(errors, "idAbogado")}
                        disabled={loading || formType == FORM_TYPE.CONSULTAR}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CheckboxControl
                        label="Amonestación Verbal"
                        checked={form.amonestacionVerbal}
                        onChange={e => setInput("amonestacionVerbal", e.target.checked)}
                        value="checked"
                        color="primary"
                        disabled={loading || formType == FORM_TYPE.CONSULTAR}
                    />
                </Grid>
            </Grid>
            <DividerTitle title="Datos del Denunciante" />
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    {!form.idTrabajadorDenunciante && formType != FORM_TYPE.CONSULTAR && (
                        <Autocomplete
                            disabled={loading || form.esDenuncianteExterno}
                            placeholder="Buscar Trabajador"
                            clearOnSelect
                            labelProp="nombreFormat"
                            onSelect={t => {
                                setInput("idTrabajadorDenunciante", t.idEmpleado);
                                setInput("nombreDenunciante", `${t.nombres} ${t.primerApellido} ${t.segundoApellido}`);
                                setInput("dependenciaDenunciante", t.dependencia);
                                setInput("idDependenciaDenunciante", t.idDependencia);
                            }}
                            url={URL_AUTOCOMPLETE_EMPLEADOS}
                            suggestionsProp="data.trabajadores"
                            helperText={getProp(errors, "idTrabajadorDenunciante")}
                            error={existsProp(errors, "idTrabajadorDenunciante")}
                        />
                    )}

                    {form.idTrabajadorDenunciante && (
                        <TextField
                            fullWidth
                            label="Nombre del Denunciante"
                            value={form.nombreDenunciante || ""}
                            InputProps={{
                                endAdornment: formType != FORM_TYPE.CONSULTAR && (
                                    <IconButton
                                        disabled={loading}
                                        onClick={handleRemoveTrabajadorDenunciante}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                )
                            }}
                            helperText={getProp(errors, "idTrabajadorDenunciante")}
                            error={existsProp(errors, "idTrabajadorDenunciante")}
                            disabled={loading || form.esDenuncianteExterno || formType == FORM_TYPE.CONSULTAR}
                        />
                    )}

                    {/* <SelectField
            fullWidth
            label="Trabajador denunciante"
            value={form.idTrabajadorDenunciante}
            onChange={e => setInput("idTrabajadorDenunciante", e.target.value)}
            options={filterLists.trabajador.value}
            loading={filterLists.trabajador.loading}
            disabled={form.esDenuncianteExterno}
          /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    {form.idTrabajadorDenunciante && <TextField
                        fullWidth
                        label="Dependencia del denunciante"
                        value={form.dependenciaDenunciante || ""}
                        disabled={true}
                    />}
                </Grid>
                <Grid item xs={12} md={3}>
                    <CheckboxControl
                        label="Denunciante externo"
                        checked={form.esDenuncianteExterno}
                        onChange={e => setInput("esDenuncianteExterno", e.target.checked)}
                        value="checked"
                        color="primary"
                        disabled={loading || formType == FORM_TYPE.CONSULTAR}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <TextField
                        fullWidth
                        label="Nombre del denunciante externo"
                        value={form.externoDenunciante || ""}
                        onChange={e => setInput("externoDenunciante", e.target.value)}
                        disabled={!form.esDenuncianteExterno || loading || formType == FORM_TYPE.CONSULTAR}
                        helperText={getProp(errors, "externoDenunciante")}
                        error={existsProp(errors, "externoDenunciante")}
                        inputProps={{
                            maxLength: 100
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows="4"
                        rowsMax="4"
                        fullWidth
                        label="Observación del caso"
                        value={form.observacion || ""}
                        onChange={e => setInput("observacion", e.target.value)}
                        disabled={loading || formType == FORM_TYPE.CONSULTAR}
                        inputProps={{
                            maxLength: 500
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

FormDatosGenerales.defaultProps = {
    loading: false,
    filterLists: {
        tiempoPrescripcion: {
            loading: false,
            value: []
        },
        abogado: {
            loading: false,
            value: []
        },
        trabajador: {
            loading: false,
            value: []
        }
    }
};

export default FormDatosGenerales;
