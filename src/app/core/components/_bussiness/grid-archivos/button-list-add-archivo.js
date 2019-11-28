import React from "react";
import Fab from "@material-ui/core/Fab";
import { red, blue, green, orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Show from "../../show";

export const TIPO_ARCHIVO = {
  PDF: { id: 1, descripcion: "DOCUMENTO", icon: "insert_drive_file" },
  VIDEO: { id: 2, descripcion: "VIDEO", icon: "videocam" },
  IMAGEN: { id: 3, descripcion: "IMAGEN", icon: "insert_photo" },
  AUDIO: { id: 4, descripcion: "AUDIO", icon: "volume_up" }
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const PdfFabButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red["A200"]),
    backgroundColor: red["A200"],
    "&:hover": {
      backgroundColor: red["A700"]
    }
  }
}))(Fab);

const VideoFabButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700]
    }
  }
}))(Fab);

const PhotoFabButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}))(Fab);

const AudioFabButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[800]),
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
}))(Fab);

const ButtonListAddArchivo = ({
  onClick,
  hidePdfButton,
  hideVideoButton,
  hidePhotoButton,
  hideAudioButton
}) => {
  const classes = useStyles();
  return (
    <>
      <Show condition={!hidePdfButton}>
        <Tooltip title="Subir Pdf" aria-label="Add" placement="top">
          <PdfFabButton
            aria-label="Pdf"
            className={classes.margin}
            size="small"
            onClick={onClick(TIPO_ARCHIVO.PDF)}
          >
            <Icon>insert_drive_file</Icon>
          </PdfFabButton>
        </Tooltip>
      </Show>
      <Show condition={!hideVideoButton}>
        <Tooltip title="Subir Video" aria-label="Add" placement="top">
          <VideoFabButton
            aria-label="Video"
            className={classes.fab}
            size="small"
            onClick={onClick(TIPO_ARCHIVO.VIDEO)}
          >
            <Icon>videocam</Icon>
          </VideoFabButton>
        </Tooltip>
      </Show>
      <Show condition={!hidePhotoButton}>
        <Tooltip title="Subir Imagen" aria-label="Add" placement="top">
          <PhotoFabButton
            aria-label="Imagen"
            className={classes.margin}
            size="small"
            onClick={onClick(TIPO_ARCHIVO.IMAGEN)}
          >
            <Icon>insert_photo</Icon>
          </PhotoFabButton>
        </Tooltip>
      </Show>
      <Show condition={!hideAudioButton}>
        <Tooltip title="Subir Audio" aria-label="Add" placement="top">
          <AudioFabButton
            aria-label="Audio"
            className={classes.fab}
            size="small"
            onClick={onClick(TIPO_ARCHIVO.AUDIO)}
          >
            <Icon>volume_up</Icon>
          </AudioFabButton>
        </Tooltip>
      </Show>
    </>
  );
};

ButtonListAddArchivo.defaultProps = {
  hidePdfButton: false,
  hideVideoButton: false,
  hidePhotoButton: false,
  hideAudioButton: false
};

export default ButtonListAddArchivo;
