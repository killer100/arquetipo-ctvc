import React, { Component, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormSearchContainer from "app/core/components/form-search-container";
import GridToolbar from "app/core/components/grid-toolbar";
import { buildFormBuscarAbogado } from "../../_store/_initial-state";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "80%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

/**
 *
 * @param {{onSearch: () => void), onClear: () => void)}} param0
 */
const FormBuscar = ({ classes, onSearch, onClear, onClickNew }) => {
  const [state, setState] = useState(buildFormBuscarAbogado());

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <FormSearchContainer
            onSearch={() => {
              onSearch(state);
            }}
            onClear={() => {
              setState(buildFormBuscarAbogado());
              onClear(buildFormBuscarAbogado());
            }}
          >
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                label="DNI"
                className={classes.textField}
                value={state.dniAbogado}
                onChange={e =>
                  setState({ ...state, dniAbogado: e.target.value })
                }
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                label="Nombres"
                className={classes.textField}
                value={state.nombres}
                onChange={e => setState({ ...state, nombres: e.target.value })}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                label="Primer apellido"
                className={classes.textField}
                value={state.primerApellido}
                onChange={e =>
                  setState({ ...state, primerApellido: e.target.value })
                }
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                label="Segundo apellido"
                className={classes.textField}
                value={state.segundoApellido}
                onChange={e =>
                  setState({ ...state, segundoApellido: e.target.value })
                }
                margin="normal"
              />
            </Grid>
          </FormSearchContainer>
        </CardContent>
      </Card>
      <GridToolbar onClickNew={onClickNew} />
    </>
  );
};

export default withStyles(styles)(FormBuscar);
