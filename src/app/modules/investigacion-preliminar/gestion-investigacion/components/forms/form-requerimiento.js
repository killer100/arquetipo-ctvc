import React, { useState } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { UploadTempFile } from "app/core/api/file-upload.api";
import toast from "app/core/components/toast";
import confirm from "app/core/components/confirm";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  dropzone: {
    minHeight: 150,
    height: 150
  },
  hide: {
    display: "none"
  }
}));

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalFormRequerimiento,
 *  store: import('../../_store/gestion-investigacion.store').GestionInvestigacionStore
 * }} param0
 */
const FormRequerimiento = ({ modal, store, onUploadFinish }) => {
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [file, setFile] = useState(null);
  const classes = useStyles();

  const handleClose = () => {
    confirm("Va cerrar el formulario, ¿Continuar?").then(confirm => {
      if (confirm) store.modalFormRequerimientoActions.closeModal();
    });
  };

  const handleSave = () => {
    setErrorDescripcion(null);

    if (!descripcion) {
      setErrorDescripcion("Debe ingresar la descripción");
      return false;
    }

    confirm("Va a subir el requerimiento, ¿Continuar?").then(confirm => {
      if (confirm) {
        store.modalFormRequerimientoActions.setLoading(true);
        UploadTempFile([file])
          .then(resp => {
            toast("Requerimiento subido correctamente!", "success");
            store.modalFormRequerimientoActions.setLoading(false);
            onUploadFinish({
              nombreArchivo: resp.data.files[0].tempName,
              idTipoArchivo: 1,
              tipoArchivo: "PDF",
				  descripcionArchivo: descripcion,
				  fechaRegistro: moment()
            });
            store.modalFormRequerimientoActions.closeModal();
          })
          .catch(err => {
            console.error(err);
            toast("Hubo un error al subir los archivos", "error");
            store.modalFormRequerimientoActions.setLoading(false);
          });
      }
    });
  };

  return (
    <ModalFormContainer
      loading={modal.isLoading}
      open={modal.open}
      onClose={handleClose}
      onExited={() => {
        setFile(null);
        setDescripcion("");
      }}
      fullWidth
      title="Agregar Requerimiento"
      onSubmit={handleSave}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción del Requerimiento"
            value={descripcion}
            onChange={e => {
              setDescripcion(e.target.value);
            }}
            helperText={errorDescripcion}
            error={errorDescripcion != null}
            disabled={modal.isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Archivo a Cargar"
            value={file ? file.name : ""}
            disabled={modal.isLoading}
            InputProps={{
              endAdornment: (
                <>
                  <input
                    accept="application/pdf"
                    className={classes.hide}
                    id="contained-button-requerimiento-file"
                    type="file"
                    onChange={e => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <label htmlFor="contained-button-requerimiento-file">
                    <IconButton
                      variant="contained"
                      component="span"
                      className={classes.button}
                    >
                      <Icon>cloud_upload</Icon>
                    </IconButton>
                  </label>
                </>
              )
            }}
          />
        </Grid>
      </Grid>
    </ModalFormContainer>
  );
};

export default FormRequerimiento;
