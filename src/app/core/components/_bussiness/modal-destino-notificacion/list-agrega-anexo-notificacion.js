import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DividerTitle from "app/core/components/divider-title";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  buttonAdd: {
    marginTop: 10,
    marginLeft: 5,
    background: green[500],
    "&:hover": {
      background: green[900]
    }
  },
  listItem: {
    borderBottom: 'solid 1px #ededed'
  }
}));

const ListAgregaAnexoNotificacion = ({
  onRemoveAnexo,
  anexos,
  onAddAnexo,
  disabled
}) => {
  const classes = useStyles();
  const [anexoDescripcion, setAnexoDescripcion] = useState("");

  const handleAddAnexo = () => {
    onAddAnexo({
      descripcionAnexoCargo: anexoDescripcion
    });
    setAnexoDescripcion("");
  };
  return (
    <div>
      <DividerTitle title="Documentos Anexos al Cargo de Notificación" />

      <Grid container>
        <Grid item xs={8}>
          <TextField
            fullWidth
            disabled={disabled}
            onChange={e => setAnexoDescripcion(e.target.value)}
            value={anexoDescripcion}
            label="Ingrese descripción del anexo"
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            className={classes.buttonAdd}
            variant="contained"
            color="primary"
            onClick={handleAddAnexo}
            disabled={disabled}
          >
            <Icon>add_circle_outline</Icon>
            Agregar
          </Button>
        </Grid>
      </Grid>

      <List>
        {anexos.map((item, rowIndex) => (
          <ListItem key={rowIndex} className={classes.listItem}>
            <ListItemText primary={item.descripcionAnexoCargo} />
            <ListItemSecondaryAction>
              <IconButton
                disabled={disabled}
                edge="end"
                aria-label="delete"
                onClick={() =>
                  onRemoveAnexo(rowIndex, item.idAnexoDestinoNotificacion)
                }
              >
                <Icon>delete</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ListAgregaAnexoNotificacion.defaultProps = {
  anexos: []
};
export default ListAgregaAnexoNotificacion;
