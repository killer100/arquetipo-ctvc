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

const GridInvestigacionButtons = ({
    item,
    disabled,
    onClickShow,
    onClickEdit,
    onClickDelete,
    onClickInformePreliminar
}) => {
    const classes = useStyles();

    return (
        <>
            {item.puedeRegistrarIP && <Tooltip title="Informe Preliminar" aria-label="Add" placement="top">
                <IconButton
                    aria-label="Show"
                    disabled={disabled}
                    className={classes.margin}
                    onClick={() => onClickInformePreliminar(item.idExpedienteInvestigacion, item.idInformePreliminar)}
                >
                    <Icon fontSize="small">assignment</Icon>
                </IconButton>
            </Tooltip>}
            <Tooltip title="Ver Investigación" aria-label="Add" placement="top">
                <IconButton
                    aria-label="Show"
                    disabled={disabled}
                    className={classes.margin}
                    onClick={() => onClickShow(item.idExpedienteInvestigacion)}
                >
                    <Icon fontSize="small">remove_red_eye</Icon>
                </IconButton>
            </Tooltip>
            {item.idEstadoExpediente != 4 && <Tooltip title="Editar" aria-label="Add" placement="top">
                <IconButton
                    aria-label="Edit"
                    disabled={disabled}
                    className={classes.margin}
                    onClick={() => onClickEdit(item.idExpedienteInvestigacion)}
                >
                    <Icon fontSize="small">edit</Icon>
                </IconButton>
            </Tooltip>}
            {/*<Tooltip title="Eliminar" aria-label="Add" placement="top">
				<IconButton
					aria-label="Delete"
					disabled={disabled}
					className={classes.margin}
					onClick={() => onClickDelete(item.idExpedienteInvestigacion)}
				>
					<Icon fontSize="small">delete</Icon>
				</IconButton>
			</Tooltip>*/}
        </>
    );
};

export default GridInvestigacionButtons;
