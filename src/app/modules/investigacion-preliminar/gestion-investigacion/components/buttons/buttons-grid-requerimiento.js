import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
    padding: 2,
  },
}));

const GridRequerimientoButtons = ({
  rowIndex,
  item,
  disabled,
  onClickShow,
  onClickDelete,
  readonly,
}) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Descargar Archivo Adjunto" aria-label="Add" placement="top">
        <IconButton
          aria-label="Show"
          disabled={disabled}
          className={classes.margin}
          onClick={() => onClickShow(item.nombreArchivo)}
        >
          <Icon fontSize="small">cloud_download</Icon>
        </IconButton>
      </Tooltip>
      {!readonly && (
        <Tooltip title="Eliminar" aria-label="Delete" placement="top">
          <IconButton
            aria-label="Delete"
            disabled={disabled}
            className={classes.margin}
            onClick={() => onClickDelete(rowIndex, item.idArchivoAdjunto)}
          >
            <Icon fontSize="small">delete</Icon>
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default GridRequerimientoButtons;
