import React, { useState, useEffect } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FORM_TYPE } from "app/core/enums/enums";
import confirm from "app/core/components/confirm";
import { buildTitulo } from "../../_store/_initial-state";
import DividerTitle from "app/core/components/divider-title";
import { getProp, existsProp } from "app/core/helpers";

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
 * @param {import('../../_store/gestion-titulo.store').GestionTituloStore} store
 * @param {import('../../_store/_initial-state').modalGestionTitulo} modal
 * @param {*} form
 */
const handleSave = (modal, store, form, idNorma) => {
  switch (modal.formType) {
    case FORM_TYPE.REGISTRAR:
      store.modalGestionTituloActions
        .asyncSaveTitulo({ ...form, idNorma })
        .then(() => {
            store.buscadorTituloActions.asyncFetchTitulos(idNorma);
        });
      break;
    case FORM_TYPE.EDITAR:
      store.modalGestionTituloActions
        .asyncUpdateTitulo(modal.idTitulo, form)
        .then(() => {
            store.buscadorTituloActions.asyncFetchTitulos(idNorma);
        });
      break;
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalGestionTitulo,
 *  store: import('../../_store/gestion-titulo.store').GestionTituloStore,
 *  normaData: import('../../_store/_initial-state').normaData
 * }} param0
 */
const FormGestionTitulo = ({ modal, store, normaData }) => {
  const [form, setForm] = useState(buildTitulo());

  useEffect(() => {
    if (modal.idTitulo != null) {
      store.modalGestionTituloActions.asyncGetTitulo(modal.idTitulo);
    }
  }, [modal.idTitulo]);

  useEffect(() => setForm(modal.titulo), [modal.titulo]);

  return (
    <ModalFormContainer
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalGestionTituloActions.closeModal
      )}
      title={modal.title}
      onExited={() => {
        store.modalGestionTituloActions.resetModal();
      }}
      onSubmit={() => handleSave(modal, store, form, normaData.idNorma)}
      loading={modal.loading}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
    >
      {normaData.norma && (
        <>
          <DividerTitle title="Datos de la Norma Legal" marginTop={false} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                value={normaData.norma.numeroNorma}
                fullWidth
                label="Número de la Norma"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={normaData.norma.descripcion}
                fullWidth
                label="Descripción de la Norma Legal"
              />
            </Grid>
          </Grid>
        </>
      )}

      <DividerTitle title="Datos de Título de la Norma Legal" />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            value={form.numeroTitulo}
            fullWidth
            label="Número del Título"
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            onChange={e => setForm({ ...form, numeroTitulo: e.target.value })}
            helperText={getProp(modal.errors, "numeroTitulo")}
            error={existsProp(modal.errors, "numeroTitulo")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={form.descripcion}
            fullWidth
            label="Descripción del Título"
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

export default FormGestionTitulo;
