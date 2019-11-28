import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { GetPersona } from "app/core/api/personas.api";
import ButtonIconInputSearch from "app/core/components/buttons/button-icon-input-search";
import confirm from "app/core/components/confirm";
import ModalFormContainer from "app/core/components/modal-form-container";
import toast from "app/core/components/toast";
import { FORM_TYPE } from "app/core/enums/enums";
import React, { useEffect, useState } from "react";
import { buildAbogado } from "../../_store/_initial-state";
import { HandleOnlyNumber } from "app/core/helpers";

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
 * @param {import('../../_store/abogado.store').AbogadoStore} store
 * @param {import('../../_store/_initial-state').modalGestionAbogado} modal
 * @param {*} form
 */
const handleSave = (modal, store, form) => {
  switch (modal.formType) {
    case FORM_TYPE.REGISTRAR:
      store.modalGestionAbogadoActions.asyncSaveAbogado(form).then(() => {
        store.buscadorAbogadoActions.asyncFetchAbogados();
      });
      break;
    case FORM_TYPE.EDITAR:
      store.modalGestionAbogadoActions
        .asyncUpdateAbogado(modal.idAbogado, form)
        .then(() => {
          store.buscadorAbogadoActions.asyncFetchAbogados();
        });
      break;
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalGestionAbogado,
 *  store: import('../../_store/abogado.store').AbogadoStore
 * }} param0
 */

const FormGestionAbogado = ({ modal, store }) => {
  const [foundPerson, setFoundPerson] = useState(false);
  const [form, setForm] = useState(buildAbogado());
  const [loadingPersona, setLoadingPersona] = useState(false);

  useEffect(() => {
    setFoundPerson(false);
    if (modal.idAbogado != null) {
      store.modalGestionAbogadoActions
        .asyncGetAbogado(modal.idAbogado)
        .then(abogado => {
          if (abogado) setFoundPerson(true);
        });
    }
  }, [modal.idAbogado]);

  useEffect(() => setForm(modal.abogado), [modal.abogado]);

  const removeDni = () => {
    setFoundPerson(false);
    setForm(buildAbogado());
  };

  const handleSearchPerson = () => {
    setLoadingPersona(true);
    GetPersona(form.dniAbogado).then(persona => {
      if (persona) {
        setForm({
          ...form,
          nombres: persona.nombres,
          primerApellido: persona.primerApellido,
          segundoApellido: persona.segundoApellido
        });
        setFoundPerson(true);
        setLoadingPersona(false);
      } else {
        setLoadingPersona(false);
        toast("No se encontró la persona buscada", "warning");
      }
    });
  };

  return (
    <ModalFormContainer
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalGestionAbogadoActions.closeModal
      )}
      title={modal.title}
      onExited={() => {
        setFoundPerson(false);
        store.modalGestionAbogadoActions.resetModal();
      }}
      onSubmit={() => handleSave(modal, store, form)}
      loading={modal.loading || loadingPersona}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            value={form.dniAbogado}
            fullWidth
            label="N° DNI"
            disabled={modal.loading}
            onChange={e =>
              HandleOnlyNumber(e, () =>
                setForm({ ...form, dniAbogado: e.target.value })
              )
            }
            inputProps={{
              maxLength: 8,
              readOnly: foundPerson
            }}
            InputProps={{
              endAdornment: modal.formType != FORM_TYPE.CONSULTAR && (
                <ButtonIconInputSearch
                  disabled={modal.loading}
                  found={foundPerson}
                  onClickSearch={handleSearchPerson}
                  onClickRemove={removeDni}
                />
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField value={form.nombres} fullWidth label="Nombres" disabled />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={form.primerApellido}
            fullWidth
            label="Primer Apellido"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={form.segundoApellido}
            fullWidth
            label="Segundo Apellido"
            disabled
          />
        </Grid>
      </Grid>
    </ModalFormContainer>
  );
};

export default FormGestionAbogado;
