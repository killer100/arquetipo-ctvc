import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DatePicker from "app/core/components/datepicker";
import ButtonUpDownPdf from "app/core/components/_bussiness/button-up-down-pdf";
import { existsProp, getProp, HandleOnlyNumber } from "app/core/helpers";
import React from "react";

/**
 *
 * @param {{
 *  form: {
 *  numeroCarta: string,
 *  fechaCarta: string,
 *  observacion: string,
 *  descArchivoRemiteInfoOi: string,
 *  nomArchivoRemiteInfoOi: string
 *  },
 * }} param0
 */
const FormRemisionInformeOI = ({
  setInput,
  form,
  loading,
  readonly,
  errors
}) => {
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
            label="Carta de Remisión del Órgano Instructor"
            value={form.nomArchivoRemiteInfoOi || ''}
            disabled={loading || readonly}
            InputProps={{
              endAdornment: (
                <ButtonUpDownPdf
                  filename={form.nomArchivoRemiteInfoOi || ''}
                  onRemove={e => setInput("nomArchivoRemiteInfoOi", "")}
                  onUpload={filename =>
                    setInput("nomArchivoRemiteInfoOi", filename)
                  }
                ></ButtonUpDownPdf>
              )
            }}
            helperText={getProp(errors, "nomArchivoRemiteInfoOi")}
            error={existsProp(errors, "nomArchivoRemiteInfoOi")}
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

FormRemisionInformeOI.defaultProps = {
  loading: false,
  readonly: false
};

export default FormRemisionInformeOI;
