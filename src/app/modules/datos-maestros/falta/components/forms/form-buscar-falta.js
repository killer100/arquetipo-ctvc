import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarFalta } from "../../_store/_initial-state";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));
/**
 *
 * @param {{
 *  store: import('../../_store/gestion-falta.store').GestionFaltaStore
 *  idArticulo: number
 * }} param0
 */
const FormBuscarFalta = ({ store, pageSize, idArticulo }) => {
  const [form, setForm] = useState(buildFormBuscarFalta());
  const classes = useStyles();

  const handleSearch = () => {
    store.buscadorFaltaActions.asyncFetchFaltas(
      idArticulo,
      1,
      pageSize,
      form
    );
  };

  const handleClear = () => {
    const newForm = buildFormBuscarFalta();
    setForm(newForm);
    store.buscadorFaltaActions.asyncFetchFaltas(
      idArticulo,
      1,
      pageSize,
      newForm
    );
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <FormSearchContainer onSearch={handleSearch} onClear={handleClear}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Literal de la Falta"
                value={form.numeroFalta}
                fullWidth
                onChange={e =>
                  setForm({ ...form, numeroFalta: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="Descripción de la Falta"
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
      <GridToolbar
        onClickNew={store.modalGestionFaltaActions.openModalNew}
      />
    </>
  );
};

export default FormBuscarFalta;
