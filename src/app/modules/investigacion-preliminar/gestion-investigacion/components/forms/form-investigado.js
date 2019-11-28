import React, { useState, useEffect } from "react";
import { buildInvestigado } from "../../_store/_initial-state";
import ModalFormContainer from "app/core/components/modal-form-container";
import Grid from "@material-ui/core/Grid";
import { FORM_TYPE } from "app/core/enums/enums";
import SelectField from "app/core/components/select-field";
import TextField from "@material-ui/core/TextField";
import ButtonIconInputSearch from "app/core/components/buttons/button-icon-input-search";
import { FetchDependencias, FetchCargos } from "app/core/api/maestros.api";
import { GetPersona } from "app/core/api/personas.api";
import { getProp, existsProp, HandleOnlyNumber } from "app/core/helpers";
import toast from "app/core/components/toast";
import confirm from "app/core/components/confirm";

const defaultListDependencias = {
  value: [],
  loading: false
};

const defaultListCargos = {
  value: [],
  loading: false
};

const loadDependencias = (list, setList) => {
  setList({ ...list, loading: true });
  FetchDependencias().then(dependencias => {
    setList({ loading: false, value: dependencias });
  });
};

const loadCargos = (list, setList) => {
  setList({ ...list, loading: true });
  FetchCargos().then(cargos => {
    setList({ loading: false, value: cargos });
  });
};

const handleClose = (formType, close, setFoundInvestigado) => () => {
  if (formType == FORM_TYPE.CONSULTAR) {
    close();
    setFoundInvestigado(false);
  } else {
    confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
      if (confirm) {
        close();
        setFoundInvestigado(false);
      }
    });
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalFormInvestigado,
 *  store: import('../../_store/gestion-investigacion.store').GestionInvestigacionStore
 * }} param0
 */
const FormInvestigado = ({
  modal,
  store,
  OnAdd,
  OnUpdate,
  idExpedienteInvestigacion
}) => {
  const [listDependencias, setListDependencias] = useState(
    defaultListDependencias
  );
  const [listCargos, setListCargos] = useState(defaultListCargos);
  const [foundInvestigado, setFoundInvestigado] = useState(false);
  const [form, setForm] = useState(buildInvestigado());
  const [loadingPersona, setLoadingPersona] = useState(false);

  useEffect(() => {
    if (modal.idInvestigado != null) {
      store.modalFormInvestigadoActions.asyncGetInvestigado(
        idExpedienteInvestigacion,
        modal.idInvestigado
      );
    }
  }, [modal.idInvestigado]);

  useEffect(() => setForm(modal.investigado), [modal.investigado]);

  const handleSave = () => {
    switch (modal.formType) {
      case FORM_TYPE.REGISTRAR:
        if (idExpedienteInvestigacion) {
          store.modalFormInvestigadoActions
            .asyncSaveInvestigado(idExpedienteInvestigacion, form)
            .then(idInvestigado => {
              OnAdd({ ...form, idInvestigado });
              setFoundInvestigado(false);
            });
        } else {
          OnAdd(form);
          store.modalFormInvestigadoActions.closeModal();
          setFoundInvestigado(false);
        }
        break;
      case FORM_TYPE.EDITAR:
        if (idExpedienteInvestigacion) {
          store.modalFormInvestigadoActions
            .asyncUpdateInvestigado(
              idExpedienteInvestigacion,
              modal.idInvestigado,
              form
            )
            .then(() => {
              OnUpdate(modal.rowIndex, form);
              setFoundInvestigado(false);
            });
        } else {
          OnUpdate(modal.rowIndex, form);
          store.modalFormInvestigadoActions.closeModal();
          setFoundInvestigado(false);
        }
        break;
    }
  };

  const handleSubmit = () => {
    store.modalFormInvestigadoActions.setErrors(null);
    if (!form.idDependencia) {
      store.modalFormInvestigadoActions.setErrors({
        idDependencia: "La dependencia es obligatoria."
      });
      return false;
    }
    confirm("Va a agregar el investigado ¿Continuar?").then(c => {
      if (c) handleSave();
    });
  };

  const handleSearchPersona = () => {
    setLoadingPersona(true);
    GetPersona(form.dniInvestigado)
      .then(persona => {
        if (persona) {
          setForm({
            ...form,
            nombres: persona.nombres,
            primerApellido: persona.primerApellido,
            segundoApellido: persona.segundoApellido
          });
          setFoundInvestigado(true);
        } else {
          toast("No se encontró la persona buscada", "warning");
        }
        setLoadingPersona(false);
      })
      .catch(() => {
        setLoadingPersona(false);
      });
  };

  const handleRemovePersona = () => {
    setFoundInvestigado(false);
    setForm(buildInvestigado());
  };

  return (
    <ModalFormContainer
      loading={modal.loading || loadingPersona}
      open={modal.open}
      onClose={handleClose(
        modal.formType,
        store.modalFormInvestigadoActions.closeModal,
        setFoundInvestigado
      )}
      fullWidth
      title={modal.title}
      onExited={store.modalFormInvestigadoActions.resetModal}
      onEnter={() => {
        loadDependencias(listDependencias, setListDependencias);
        loadCargos(listCargos, setListCargos);
      }}
      onSubmit={handleSubmit}
      showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Número del DNI"
            value={form.dniInvestigado || ""}
            onChange={e =>
              HandleOnlyNumber(e, () =>
                setForm({
                  ...form,
                  dniInvestigado: e.target.value
                })
              )
            }
            InputProps={{
              endAdornment: modal.formType != FORM_TYPE.CONSULTAR && (
                <ButtonIconInputSearch
                  disabled={modal.loading}
                  found={foundInvestigado}
                  onClickSearch={handleSearchPersona}
                  onClickRemove={handleRemovePersona}
                />
              )
            }}
            inputProps={{ maxLength: 8 }}
            helperText={getProp(modal.errors, "dniInvestigado")}
            error={existsProp(modal.errors, "dniInvestigado")}
            disabled={
              foundInvestigado ||
              modal.loading ||
              modal.formType == FORM_TYPE.CONSULTAR
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombres de la Persona"
            value={form.nombres || ""}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Primer Apellido de la Persona"
            value={form.primerApellido || ""}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Segundo Apellido de la Persona"
            value={form.segundoApellido || ""}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12}>
          <SelectField
            fullWidth
            label="Unidad Orgánica"
            value={form.idDependencia}
            onChange={e => {
              setForm({
                ...form,
                idDependencia: e.target.value,
                descDependencia: e.target.value
                  ? listDependencias.value.find(x => x.value == e.target.value)
                      .label
                  : null
              });
            }}
            options={listDependencias.value}
            loading={listDependencias.loading}
            helperText={getProp(modal.errors, "idDependencia")}
            error={existsProp(modal.errors, "idDependencia")}
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
          />
        </Grid>

        <Grid item xs={12}>
          <SelectField
            fullWidth
            label="Cargo del Trabajador"
            value={form.idCargo}
            onChange={e => {
              setForm({
                ...form,
                idCargo: e.target.value,
                descCargo: e.target.value
                  ? listCargos.value.find(x => x.value == e.target.value).label
                  : null
              });
            }}
            options={listCargos.value}
            loading={listCargos.loading}
            helperText={getProp(modal.errors, "idCargo")}
            error={existsProp(modal.errors, "idCargo")}
            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
          />
        </Grid>
      </Grid>
    </ModalFormContainer>
  );
};

export default FormInvestigado;
