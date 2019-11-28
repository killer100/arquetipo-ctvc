import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
    padding: 2
  }
}));

const GridActionButtons = ({
  item,
  disabled,
  onClickArticulos,
  onClickShow,
  onClickEdit,
  onClickDelete
}) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Ver Artículos" aria-label="Add" placement="top">
        <IconButton
          aria-label="Show"
          disabled={disabled}
          className={classes.margin}
          onClick={() => onClickArticulos(item.idCapitulo)}
        >
          <Icon fontSize="small">list</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Ver" aria-label="Add" placement="top">
        <IconButton
          aria-label="Show"
          disabled={disabled}
          className={classes.margin}
          onClick={() => onClickShow(item.idCapitulo)}
        >
          <Icon fontSize="small">remove_red_eye</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar" aria-label="Add" placement="top">
        <IconButton
          aria-label="Edit"
          disabled={disabled}
          className={classes.margin}
          onClick={() => onClickEdit(item.idCapitulo)}
        >
          <Icon fontSize="small">edit</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar" aria-label="Add" placement="top">
        <IconButton
          aria-label="Delete"
          disabled={disabled}
          className={classes.margin}
          onClick={() => onClickDelete(item.idCapitulo)}
        >
          <Icon fontSize="small">delete</Icon>
        </IconButton>
      </Tooltip>
    </>
  );
};

export default GridActionButtons;
