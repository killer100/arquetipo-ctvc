import React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 10,
    marginBottom: 10,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 10,
      paddingRight: 10
    }
  },
  typography: {
    flex: "1"
    
  }
});

const PageTitle = ({ classes, text, children }) => (
  <Toolbar className={classes.toolbar}>
    <Typography variant="h5" className={classes.typography}>
      {text}
    </Typography>
    <div>{children}</div>
  </Toolbar>
);

export default withStyles(styles)(PageTitle);
