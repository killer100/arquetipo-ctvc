import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarNorma } from "../../_store/_initial-state";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));
/**
 *
 * @param {{
 *  onSearch: () => void), onClear: () => void),
 *  store: import('../../_store/gestion-norma.store').GestionNormaStore
 * }} param0
 */
const FormBuscarNorma = ({ store, pageSize }) => {
  const [form, setForm] = useState(buildFormBuscarNorma());
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <FormSearchContainer
            onSearch={() => {
              store.buscadorNormaActions.asyncFetchNormas(1, pageSize, form);
            }}
            onClear={() => {
              setForm(buildFormBuscarNorma());
              store.buscadorNormaActions.asyncFetchNormas(
                1,
                pageSize,
                buildFormBuscarNorma()
              );
            }}
          >
            <Grid item xs={12} sm={4}>
              <TextField
                label="Número de la Norma / Reglamento"
                className={classes.textField}
                value={form.numeroNorma}
                fullWidth
                onChange={e =>
                  setForm({ ...form, numeroNorma: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="Nombre de la Norma Legal / Reglamento"
                className={classes.textField}
                value={form.descripcion}
                fullWidth
                onChange={e =>
                  setForm({ ...form, descripcion: e.target.value })
                }
              />
            </Grid>
          </FormSearchContainer>
        </CardContent>
      </Card>
      <GridToolbar onClickNew={store.modalGestionNormaActions.openModalNew} />
    </>
  );
};

export default FormBuscarNorma;
