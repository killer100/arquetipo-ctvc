import React, { useState, useEffect } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FORM_TYPE } from "app/core/enums/enums";
import { buildNorma } from "../../_store/_initial-state";
import confirm from "app/core/components/confirm";
import { existsProp, getProp } from "app/core/helpers";

const handleClose = (formType, close) => () => {
  if (formType == FORM_TYPE.CONSULTAR) {
    close();
  } else {
    confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
      if (confirm) close();
    });
  }
};

/**
 *
 * @param {import('../../_store/gestion-norma.store').GestionNormaStore} store
 * @param {import('../../_store/_initial-state').modalGestionNorma} modal
 * @param {*} form
 */
const handleSave = (modal, store, form) => {
  switch (modal.formType) {
    case FORM_TYPE.REGISTRAR:
          store.modalGestionNormaActions.asyncSaveNorma(form).then(() => {
              store.buscadorNormaActions.asyncFetchNormas();
          });
      break;
    case FORM_TYPE.EDITAR:
          store.modalGestionNormaActions.asyncUpdateNorma(modal.idNorma, form).then(() => {
              store.buscadorNormaActions.asyncFetchNormas();
          });
      break;
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalGestionNorma,
 *  store: import('../../_store/gestion-norma.store').GestionNormaStore
 * }} param0
 */
const FormGestionNorma = ({ modal, store }) => {
  const [form, setForm] = useState(buildNorma());

  useEffect(() => {
    if (modal.idNorma != null) {
      store.modalGestionNormaActions.asyncGetNorma(modal.idNorma);
    }
  }, [modal.idNorma]);

  useEffect(() => setForm(modal.norma), [modal.norma]);

  return (
    <ModalFormContainer
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalGestionNormaActions.closeModal
      )}
      title={modal.title}
      onExited={() => {
        store.modalGestionNormaActions.resetModal();
      }}
      onSubmit={() => handleSave(modal, store, form)}
      loading={modal.loading}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            value={form.numeroNorma}
            fullWidth
            label="Número de la Norma / Reglamento"
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            onChange={e => setForm({ ...form, numeroNorma: e.target.value })}
            helperText={getProp(modal.errors, "numeroNorma")}
            error={existsProp(modal.errors, "numeroNorma")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={form.descripcion}
            fullWidth
            label="Descripción de la Norma Legal / Reglamento"
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
            helperText={getProp(modal.errors, "descripcion")}
            error={existsProp(modal.errors, "descripcion")}
          />
        </Grid>
      </Grid>
    </ModalFormContainer>
  );
};

export default FormGestionNorma;
