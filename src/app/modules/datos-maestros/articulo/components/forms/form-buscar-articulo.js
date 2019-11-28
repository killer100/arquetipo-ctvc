import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarArticulo } from "../../_store/_initial-state";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));
/**
 *
 * @param {{
 *  store: import('../../_store/gestion-articulo.store').GestionArticuloStore
 *  idCapitulo: number
 * }} param0
 */
const FormBuscarArticulo = ({ store, pageSize, idCapitulo }) => {
  const [form, setForm] = useState(buildFormBuscarArticulo());
  const classes = useStyles();

  const handleSearch = () => {
    store.buscadorArticuloActions.asyncFetchArticulos(
      idCapitulo,
      1,
      pageSize,
      form
    );
  };

  const handleClear = () => {
    const newForm = buildFormBuscarArticulo();
    setForm(newForm);
    store.buscadorArticuloActions.asyncFetchArticulos(
      idCapitulo,
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
                label="Número del Artículo"
                value={form.numeroArticulo}
                fullWidth
                onChange={e =>
                  setForm({ ...form, numeroArticulo: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="Descripción del Artículo"
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
        onClickNew={store.modalGestionArticuloActions.openModalNew}
      />
    </>
  );
};

export default FormBuscarArticulo;
