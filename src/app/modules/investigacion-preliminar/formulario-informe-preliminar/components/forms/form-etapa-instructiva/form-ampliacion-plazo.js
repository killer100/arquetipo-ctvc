import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DatePicker from "app/core/components/datepicker";
import ButtonUpDownPdf from "app/core/components/_bussiness/button-up-down-pdf";
import { existsProp, getProp, HandleOnlyNumber } from "app/core/helpers";
import React from "react";

/**
 *
 * @param {{
 *  form: import('../../../_store/_initial-state').IFormEIAmpliacionPlazo,
 * }} param0
 */
const FormAmpliacionPlazo = ({ setInput, form, loading, readonly, errors }) => {

    const handleChangeNumeroDias = e => {
        HandleOnlyNumber(e, () =>
            setInput('numeroDias', e.target.value)
        )
    };

    return (<>
        <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
                <TextField
                    value={form.numeroCarta || ''}
                    fullWidth
                    label="Número de Carta"
                    disabled={loading || readonly}
                    onChange={e => setInput("numeroCarta", e.target.value)}
                    helperText={getProp(errors, "numeroCarta")}
                    error={existsProp(errors, "numeroCarta")}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <DatePicker
                    label="Fecha de Carta"
                    value={form.fechaCarta}
                    onChange={date => setInput("fechaCarta", date)}
                    disabled={loading || readonly}
                    fullWidth
                    helperText={getProp(errors, "fechaCarta")}
                    error={existsProp(errors, "fechaCarta")}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <TextField
                    value={form.numeroDias || ''}
                    fullWidth
                    label="Número de días"
                    disabled={loading || readonly}
                    onChange={handleChangeNumeroDias}
                    helperText={getProp(errors, "numeroDias")}
                    error={existsProp(errors, "numeroDias")}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Solicitud de Ampliación de Plazo"
                    value={form.nomArchivoSolicAmpliacion || ''}
                    disabled={loading || readonly}
                    InputProps={{
                        endAdornment: (
                            <ButtonUpDownPdf
                                filename={form.nomArchivoSolicAmpliacion || ''}
                                onRemove={e => setInput("nomArchivoSolicAmpliacion", "")}
                                onUpload={(filename) => setInput("nomArchivoSolicAmpliacion", filename)}
                            ></ButtonUpDownPdf>
                        )
                    }}
                    helperText={getProp(errors, "nomArchivoSolicAmpliacion")}
                    error={existsProp(errors, "nomArchivoSolicAmpliacion")}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Carta de Respuesta de Ampliación de Plazo"
                    value={form.nomArchivoRespAmpliaPlazo || ''}
                    disabled={loading || readonly}
                    InputProps={{
                        endAdornment: (
                            <ButtonUpDownPdf
                                filename={form.nomArchivoRespAmpliaPlazo || ''}
                                onRemove={e => setInput("nomArchivoRespAmpliaPlazo", "")}
                                onUpload={(filename) => setInput("nomArchivoRespAmpliaPlazo", filename)}
                            ></ButtonUpDownPdf>
                        )
                    }}
                    helperText={getProp(errors, "nomArchivoRespAmpliaPlazo")}
                    error={existsProp(errors, "nomArchivoRespAmpliaPlazo")}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <TextField
                    multiline
                    rows="3"
                    rowsMax="4"
                    fullWidth
                    label="Observaciones"
                    value={form.observacion || ""}
                    onChange={e => setInput("observacion", e.target.value)}
                    disabled={loading || readonly}
                    inputProps={{
                        maxLength: 250
                    }}
                />
            </Grid>
        </Grid>
    </>);
}

FormAmpliacionPlazo.defaultProps = {
    loading: false,
    readonly: false
};

export default FormAmpliacionPlazo;