import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarCapitulo } from "../../_store/_initial-state";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));
/**
 *
 * @param {{
 *  store: import('../../_store/gestion-capitulo.store').GestionCapituloStore
 *  idTitulo: number
 * }} param0
 */
const FormBuscarCapitulo = ({ store, pageSize, idTitulo }) => {
  const [form, setForm] = useState(buildFormBuscarCapitulo());
  const classes = useStyles();

  const handleSearch = () => {
    store.buscadorCapituloActions.asyncFetchCapitulos(
      idTitulo,
      1,
      pageSize,
      form
    );
  };

  const handleClear = () => {
    const newForm = buildFormBuscarCapitulo();
    setForm(newForm);
    store.buscadorCapituloActions.asyncFetchCapitulos(
      idTitulo,
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
                label="Número del Capítulo"
                value={form.numeroCapitulo}
                fullWidth
                onChange={e =>
                  setForm({ ...form, numeroCapitulo: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="Descripción del Capítulo"
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
        onClickNew={store.modalGestionCapituloActions.openModalNew}
      />
    </>
  );
};

export default FormBuscarCapitulo;
