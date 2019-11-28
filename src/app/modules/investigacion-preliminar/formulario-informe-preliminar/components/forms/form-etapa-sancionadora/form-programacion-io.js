import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DatePicker from "app/core/components/datepicker";
import ButtonUpDownPdf from "app/core/components/_bussiness/button-up-down-pdf";
import { existsProp, getProp } from "app/core/helpers";
import React from "react";

/**
 *
 * @param {{
 *  form: {
 *      numeroCarta: string,
 *      fechaCarta: string,
 *      observacion: string,
 *      descripcionArchivo: string,
 *      nombreArchivo: string
 *  },
 * }} param0
 */
const FormProgramacionIo = ({ setInput, form, loading, readonly, errors }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Carta de Respuesta de Informe Oral"
            value={form.nomArchivoRespInfoOral || ''}
            disabled={loading || readonly}
            InputProps={{
              endAdornment: (
                <ButtonUpDownPdf
                  filename={form.nomArchivoRespInfoOral || ''}
                  onRemove={e => setInput("nomArchivoRespInfoOral", "")}
                  onUpload={filename => setInput("nomArchivoRespInfoOral", filename)}
                ></ButtonUpDownPdf>
              )
            }}
            helperText={getProp(errors, "nomArchivoRespInfoOral")}
            error={existsProp(errors, "nomArchivoRespInfoOral")}
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
    </>
  );
};

FormProgramacionIo.defaultProps = {
  loading: false,
  readonly: false
};

export default FormProgramacionIo;
