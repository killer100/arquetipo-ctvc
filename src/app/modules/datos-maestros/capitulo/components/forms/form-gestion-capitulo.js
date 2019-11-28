import React, { useState, useEffect } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FORM_TYPE } from "app/core/enums/enums";
import confirm from "app/core/components/confirm";
import { buildCapitulo } from "../../_store/_initial-state";
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
 * @param {import('../../_store/gestion-capitulo.store').GestionCapituloStore} store
 * @param {import('../../_store/_initial-state').modalGestionCapitulo} modal
 * @param {*} form
 */
const handleSave = (modal, store, form, idTitulo) => {
  switch (modal.formType) {
    case FORM_TYPE.REGISTRAR:
      store.modalGestionCapituloActions
        .asyncSaveCapitulo({ ...form, idTitulo })
        .then(() => {
            store.buscadorCapituloActions.asyncFetchCapitulos(idTitulo);
        });
      break;
    case FORM_TYPE.EDITAR:
      store.modalGestionCapituloActions
        .asyncUpdateCapitulo(modal.idCapitulo, form)
        .then(() => {
            store.buscadorCapituloActions.asyncFetchCapitulos(idTitulo);
        });
      break;
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalGestionCapitulo,
 *  store: import('../../_store/gestion-capitulo.store').GestionCapituloStore,
 *  tituloData: import('../../_store/_initial-state').tituloData
 * }} param0
 */
const FormGestionCapitulo = ({ modal, store, tituloData }) => {
  const [form, setForm] = useState(buildCapitulo());

  useEffect(() => {
    if (modal.idCapitulo != null) {
      store.modalGestionCapituloActions.asyncGetCapitulo(modal.idCapitulo);
    }
  }, [modal.idCapitulo]);

  useEffect(() => setForm(modal.capitulo), [modal.capitulo]);

  return (
    <ModalFormContainer
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalGestionCapituloActions.closeModal
      )}
      title={modal.title}
      onExited={() => {
        store.modalGestionCapituloActions.resetModal();
      }}
      onSubmit={() => handleSave(modal, store, form, tituloData.idTitulo)}
      loading={modal.loading}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
    >
      {tituloData.titulo && (
        <>
          <DividerTitle title="Datos de la Norma Legal" marginTop={false} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Número de la Norma"
                value={tituloData.titulo.norma.numeroNorma}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción de la Norma Legal"
                value={tituloData.titulo.norma.descripcion}
                fullWidth
              />
            </Grid>
          </Grid>

          <DividerTitle
            title="Datos de Título de la Norma Legal"
            marginTop={false}
          />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Número del Título"
                value={tituloData.titulo.numeroTitulo}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción del Título"
                value={tituloData.titulo.descripcion}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      )}

      <DividerTitle title="Datos de Capítulo de la Norma Legal" />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            value={form.numeroCapitulo}
            fullWidth
            label="Número del Capítulo"
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
            onChange={e => setForm({ ...form, numeroCapitulo: e.target.value })}
            helperText={getProp(modal.errors, "numeroCapitulo")}
            error={existsProp(modal.errors, "numeroCapitulo")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={form.descripcion}
            fullWidth
            label="Descripción del Capítulo"
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

export default FormGestionCapitulo;
