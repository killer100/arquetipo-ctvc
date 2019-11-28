import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SemaforoItem from "app/core/components/semaforo";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "middle",
  },
  span: {
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: 3,
  },
}));

const LeyendaSemaforo = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SemaforoItem tipo={1} /> <span className={classes.span}>Vigente&nbsp;&nbsp;&nbsp;</span>
      <SemaforoItem tipo={2} /> <span className={classes.span}>Urgente&nbsp;&nbsp;&nbsp;</span>
      <SemaforoItem tipo={3} /> <span className={classes.span}>Por vencer&nbsp;&nbsp;&nbsp;</span>
    </div>
  );
};

export default LeyendaSemaforo;
