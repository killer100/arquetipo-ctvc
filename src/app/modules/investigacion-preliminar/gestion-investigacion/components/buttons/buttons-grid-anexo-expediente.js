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

const GridAnexoExpedienteButtons = ({
    rowIndex,
    item,
    disabled,
    onClickShow,
    onClickEdit,
    onClickDelete,
    readonly
}) => {
    const classes = useStyles();

    return (
        <>
            {item.idAnexoExpediente && <Tooltip title="Ver Expediente Anexo" aria-label="Add" placement="top">
                <IconButton
                    aria-label="Show"
                    disabled={disabled}
                    className={classes.margin}
                    onClick={() => onClickShow(item.idAnexoExpediente)}
                >
                    <Icon fontSize="small">remove_red_eye</Icon>
                </IconButton>
            </Tooltip>}
            {item.idAnexoExpediente && !readonly && <Tooltip title="Editar" aria-label="Edit" placement="top">
                <IconButton
                    aria-label="Edit"
                    disabled={disabled}
                    className={classes.margin}
                    onClick={() => onClickEdit(rowIndex, item.idAnexoExpediente)}
                >
                    <Icon fontSize="small">edit</Icon>
                </IconButton>
            </Tooltip>}

            {!readonly && <Tooltip title="Eliminar" aria-label="Delete" placement="top">
                <IconButton
                    aria-label="Delete"
                    disabled={disabled}
                    className={classes.margin}
                    onClick={() => onClickDelete(rowIndex, item.idAnexoExpediente)}
                >
                    <Icon fontSize="small">delete</Icon>
                </IconButton>
            </Tooltip>}
        </>
    );
};

export default GridAnexoExpedienteButtons;
