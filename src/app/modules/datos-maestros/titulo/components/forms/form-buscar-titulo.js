import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarTitulo } from "../../_store/_initial-state";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));
/**
 *
 * @param {{
 *  onSearch: () => void), onClear: () => void),
 *  store: import('../../_store/gestion-titulo.store').GestionTituloStore
 *  idNorma: number
 * }} param0
 */
const FormBuscarTitulo = ({ store, pageSize, idNorma }) => {
  const [form, setForm] = useState(buildFormBuscarTitulo());
  const classes = useStyles();

  const handleSearch = () => {
    store.buscadorTituloActions.asyncFetchTitulos(idNorma, 1, pageSize, form);
  };

  const handleClear = () => {
    const newForm = buildFormBuscarTitulo();
    setForm(newForm);
    store.buscadorTituloActions.asyncFetchTitulos(
      idNorma,
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
                label="Número del Título"
                className={classes.textField}
                value={form.numeroTitulo}
                fullWidth
                onChange={e =>
                  setForm({ ...form, numeroTitulo: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="Descripción del Título"
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
      <GridToolbar onClickNew={store.modalGestionTituloActions.openModalNew} />
    </>
  );
};

export default FormBuscarTitulo;
