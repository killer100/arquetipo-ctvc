import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  hide: {
    display: "none"
  },
  button: {
    padding: 0
  }
}));

const ButtonUploadPdf = ({
  loadingFile,
  onUploadFile,
  onRemoveFile,
  hasFile,
  inputId
}) => {
  const classes = useStyles();
  return (
    <>
      {!hasFile && !loadingFile && (
        <>
          <input
            accept="application/pdf"
            className={classes.hide}
            id={"contained-button-requerimiento-file-" + inputId}
            type="file"
            onChange={onUploadFile}
          />
          <label htmlFor={"contained-button-requerimiento-file-" + inputId}>
            <IconButton
              variant="contained"
              component="span"
              className={classes.button}
              type="button"
            >
              <Icon>cloud_upload</Icon>
            </IconButton>
          </label>
        </>
      )}

      {hasFile && !loadingFile && (
        <IconButton
          className={classes.button}
          onClick={onRemoveFile}
          type="button"
        >
          <Icon>delete</Icon>
        </IconButton>
      )}

      {loadingFile && <CircularProgress size={15} />}
    </>
  );
};

export default ButtonUploadPdf;
