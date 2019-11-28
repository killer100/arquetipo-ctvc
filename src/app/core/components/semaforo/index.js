import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red, green, orange } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  itemColor: {
    margin: theme.spacing(1),
    padding: 2,
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
  },
  itemGreen: {
    background: green[500],
  },
  itemRed: {
    background: red[500],
  },
  itemAmbar: {
    background: orange[500],
  },
}));

const getClassTipoColor = tipo => {
  switch (tipo) {
    case 1:
      return "itemGreen";
    case 2:
      return "itemAmbar";
    case 3:
      return "itemRed";
  }
};

const SemaforoItem = ({ tipo }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.itemColor + " " + classes[getClassTipoColor(tipo)]}
    />
  );
};

export default SemaforoItem;
