import React, { Component, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarInvestigacion } from "../../_store/_initial-state";
import SelectField from "app/core/components/select-field";
import DatePicker from "app/core/components/datepicker";
import CheckboxControl from "app/core/components/checkbox-control";
import LeyendaSemaforo from "../misc/leyenda-semaforo";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControlLabel: {
    position: "relative",
    top: 10,
  },
}));

/**
 *
 * @param {{
 *  onSearch: () => void,
 *  onClear: () => void,
 *  filterLists: import('../../_store/_initial-state').IFilterList
 * }} param0
 */
const FormBuscarInvestigacion = ({
  onSearch,
  onClear,
  onClickNew,
  filterLists,
  loading,
}) => {
  const [state, setState] = useState(buildFormBuscarInvestigacion());

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <FormSearchContainer
            onSearch={() => {
              onSearch(state);
            }}
            onClear={() => {
              setState(buildFormBuscarInvestigacion());
              onClear(buildFormBuscarInvestigacion());
            }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <SelectField
                defaultOptionText="Todos"
                fullWidth
                label="Unidad orgánica"
                value={state.idDependenciaDenunciante}
                onChange={e => {
                  setState({
                    ...state,
                    idDependenciaDenunciante: e.target.value,
                  });
                }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                options={filterLists.dependencias.value}
                loading={filterLists.dependencias.loading}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <SelectField
                defaultOptionText="Todos"
                fullWidth
                label="Abogado responsable del expediente"
                value={state.idAbogado}
                onChange={e => {
                  setState({
                    ...state,
                    idAbogado: e.target.value,
                  });
                }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                options={filterLists.abogados.value}
                loading={filterLists.abogados.loading}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Nombre del investigado"
                value={state.nombreInvestigado}
                onChange={e =>
                  setState({ ...state, nombreInvestigado: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <SelectField
                defaultOptionText="Todos"
                fullWidth
                label="Estado del expediente"
                value={state.idEstadoExpediente}
                onChange={e => {
                  setState({
                    ...state,
                    idEstadoExpediente: e.target.value,
                  });
                }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                options={filterLists.estados.value}
                loading={filterLists.estados.loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Fecha inicio"
                value={state.fechaInicio}
                onChange={date => {
                  setState({ ...state, fechaInicio: date });
                }}
                disabled={loading}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Fecha fin"
                value={state.fechaFin}
                onChange={date => {
                  setState({ ...state, fechaFin: date });
                }}
                disabled={loading}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Nombre del denunciante"
                value={state.nombreDenunciante}
                onChange={e =>
                  setState({ ...state, nombreDenunciante: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CheckboxControl
                className={classes.formControlLabel}
                label="Expediente de corrupción"
                checked={state.expedienteCorrupcion}
                onChange={e =>
                  setState({
                    ...state,
                    expedienteCorrupcion: e.target.checked,
                  })
                }
                value="checked"
                color="primary"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Número del expediente"
                value={state.numeroExpediente}
                onChange={e =>
                  setState({ ...state, numeroExpediente: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Número de hoja de trámite"
                value={state.numeroHojaTramite}
                onChange={e =>
                  setState({ ...state, numeroHojaTramite: e.target.value })
                }
              />
            </Grid>
          </FormSearchContainer>
        </CardContent>
      </Card>
      <GridToolbar onClickNew={onClickNew} leftSection={<LeyendaSemaforo />} />
    </>
  );
};

FormBuscarInvestigacion.defaultProps = {
  loading: false,
};

export default FormBuscarInvestigacion;
