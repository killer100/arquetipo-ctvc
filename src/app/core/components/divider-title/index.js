import React from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  typography: {
    display: "block",
    marginTop: props => theme.spacing(props.marginTop ? 2 : 0),
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em"
  },
  dividerTitle: {
    marginBottom: theme.spacing(2)
  }
}));

const DividerTitle = ({ title, marginTop }) => {
  const classes = useStyles({ marginTop });
  return (
    <>
      <Typography variant="caption" className={classes.typography} gutterBottom>
        {title}
      </Typography>
      <Divider className={classes.dividerTitle} />
    </>
  );
};

DividerTitle.defaultProps = {
  marginTop: true
};

export default DividerTitle;
