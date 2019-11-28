import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { purple, red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    buttonPurple: {
        background: purple[600],
        color: theme.palette.common.white,
        "&:hover": {
            background: purple[900]
        }
    },
    buttonRed: {
        background: red[500],
        color: theme.palette.common.white,
        "&:hover": {
            background: red["A700"]
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1)
    },
    root: {
        marginTop: theme.spacing(3),
        textAlign: "right"
    }
}));

const ButtonsEtapaInstructiva = ({
    showButtonInformeOI,
    onClickInformeOI,
    onClickCancelar,
    onClickGuardar,
    disabled,
    showButtonGuardar
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {showButtonInformeOI && (
                <Button
                    disabled={disabled}
                    onClick={onClickInformeOI}
                    variant="contained"
                    className={`${classes.buttonInformeOI} ${classes.button}`}
                >
                    <Icon>subdirectory_arrow_right</Icon>Informe OI
        </Button>
            )}
            {showButtonGuardar && <Button
                disabled={disabled}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onClickGuardar}
            >
                <Icon>save</Icon>Guardar
      </Button>}
            <Button
                disabled={disabled}
                onClick={onClickCancelar}
                variant="contained"
                className={`${classes.buttonRed} ${classes.button}`}
            >
                <Icon>input</Icon> Salir
      </Button>
        </div>
    );
};

export default ButtonsEtapaInstructiva;
