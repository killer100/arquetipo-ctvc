import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import { UploadTempFile } from "app/core/api/file-upload.api";
import toast from "app/core/components/toast";
import confirm from "app/core/components/confirm";
import ModalFormContainer from "../../modal-form-container";
import { TIPO_ARCHIVO } from "./button-list-add-archivo";
import ListFiles from "./list-files";

const MAX_LOAD_FILES = 5;

const useStyles = makeStyles(theme => ({
  dropzone: {
    minHeight: 150,
    height: 150
  },
  hide: {
    display: "none"
  }
}));

const getAcceptedFiles = idTipoArchivo => {
  switch (idTipoArchivo) {
    case TIPO_ARCHIVO.PDF.id:
      return ["application/pdf"];
    case TIPO_ARCHIVO.IMAGEN.id:
      return ["image/*"];
    case TIPO_ARCHIVO.AUDIO.id:
      return ["audio/*"];
    case TIPO_ARCHIVO.VIDEO.id:
      return ["video/*"];
  }
};

const mapUploadedFiles = (files, idTipoArchivo, tipoArchivo, descripcion) => {
  return files.map(file => ({
    ...file,
    idTipoArchivo: idTipoArchivo,
    tipoArchivo: tipoArchivo,
    nombreArchivo: file.tempName,
    descripcionArchivo: descripcion
  }));
};

const FormArchivo = ({ open, onClose, tipoArchivo, onUploadFinish }) => {
  const [loading, setLoading] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    confirm("Va cerrar el formulario, ¿Continuar?").then(confirm => {
      if (confirm) onClose();
    });
  };

  const handleSave = () => {
    setErrorDescripcion(null);

    if (!descripcion) {
      setErrorDescripcion("Debe ingresar la descripción");
      return false;
    }

    const onConfirm = () => {
      setLoading(true);
      UploadTempFile(files)
        .then(resp => {
          toast("Archivos subidos correctamente!", "success");
          setLoading(false);
          onUploadFinish(
            mapUploadedFiles(
              resp.data.files,
              tipoArchivo.id,
              tipoArchivo.descripcion,
              descripcion
            )
          );
          onClose();
        })
        .catch(err => {
          console.error(err);
          toast("Hubo un error al subir los archivos", "error");
          setLoading(false);
        });
    };

    confirm("Va a subir los archivos seleccionados, ¿Continuar?").then(
      confirm => {
        if (confirm) {
          onConfirm();
        }
      }
    );
  };

  const acceptedFiles = getAcceptedFiles(tipoArchivo.id);

  return (
    <ModalFormContainer
      loading={loading}
      open={open}
      onClose={handleClose}
      onExited={() => {
        setFiles([]);
        setDescripcion("");
      }}
      fullWidth
      title="Agregar Archivo Adjunto (max. 30Mb)"
      onSubmit={handleSave}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            disabled={true}
            fullWidth
            label="Tipo de Archivo"
            value={tipoArchivo.descripcion}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción del Archivo"
            value={descripcion}
            onChange={e => {
              setDescripcion(e.target.value);
            }}
            helperText={errorDescripcion}
            error={errorDescripcion != null}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <DropzoneArea
            maxFileSize={30000000}
            dropzoneClass={`${classes.dropzone} ${
              files.length >= MAX_LOAD_FILES ? classes.hide : ""
            }`}
            dropzoneText="Arrastre un archivo o click aquí"
            onDrop={fileDroped => {
              if (files.length < MAX_LOAD_FILES) {
                setFiles([...files, fileDroped]);
              }
            }}
            showAlerts={false}
            showPreviewsInDropzone={false}
            showPreviews={false}
            filesLimit={10000}
            acceptedFiles={acceptedFiles}
          />
        </Grid>

        {files.length > 0 && (
          <Grid item xs={12}>
            <ListFiles
              disabled={loading}
              files={files}
              icon={tipoArchivo.icon}
              onRemove={i => () => {
                setFiles(update(files, { $splice: [[i, 1]] }));
              }}
            />
          </Grid>
        )}
      </Grid>
    </ModalFormContainer>
  );
};

export default FormArchivo;
