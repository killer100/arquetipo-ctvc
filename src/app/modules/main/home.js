import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import img from "assets/img/img-sispad.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  img: {
    //width: "90%",
    height: 60,
  },
}));

const HomeComponent = () => {
  const classes = useStyles();

  return (
    <Paper elevation={8} className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <img className={classes.img} src={img} />
        </Grid>

        <Grid item xs={12}>
          El presente aplicativo tiene como finalidad, llevar la trazabilidad del Procedimiento Administrativo Disciplinario, que es el conjunto de etapas y actuaciones establecidas por la Administración Pública, a través de los Órganos Instructores y Sancionadores con el objeto de ejercer su facultad sancionadora disciplinaria ante la ocurrencia de faltas disciplinarias que pudiesen haber cometido los servidores civiles en el ejercicio de sus funciones.
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HomeComponent;
