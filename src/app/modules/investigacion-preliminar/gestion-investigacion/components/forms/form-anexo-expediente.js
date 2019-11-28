import React, { useState, useEffect } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import Grid from "@material-ui/core/Grid";
import { buildAnexoExpediente } from "../../_store/_initial-state";
import DatePicker from "app/core/components/datepicker";
import TextField from "@material-ui/core/TextField";
import ButtonIconInputSearch from "app/core/components/buttons/button-icon-input-search";
import { FORM_TYPE } from "app/core/enums/enums";
import confirm from "app/core/components/confirm";
import { HandleOnlyNumber } from "app/core/helpers";

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalFormAnexoExpediente,
 *  store: import('../../_store/gestion-investigacion.store').GestionInvestigacionStore
 * }} param0
 */
const FormAnexoExpediente = ({
    modal,
    store,
    OnAdd,
    OnUpdate,
    idExpedienteInvestigacion
}) => {
    const [foundExpediente, setFoundExpediente] = useState(false);
    const [form, setForm] = useState(buildAnexoExpediente());
    const [loadingExpediente, setLoadingExpediente] = useState(false);

    useEffect(() => {
        if (modal.idAnexoExpediente != null) {
            store.modalFormAnexoExpedienteActions.asyncGetAnexoExpediente(
                idExpedienteInvestigacion,
                modal.idAnexoExpediente
            );
        }
    }, [modal.idAnexoExpediente]);

    useEffect(() => setForm(modal.expediente), [modal.expediente]);

    const handleClose = () => {
        if (modal.formType == FORM_TYPE.CONSULTAR) {
            store.modalFormAnexoExpedienteActions.closeModal();
        } else {
            confirm("Va cerrar el formulario, ¿Continuar?").then(confirm => {
                if (confirm) store.modalFormAnexoExpedienteActions.closeModal();
            });
        }
    };

    const handleSave = () => {
        switch (modal.formType) {
            case FORM_TYPE.REGISTRAR:
                if (idExpedienteInvestigacion) {
                    store.modalFormAnexoExpedienteActions
                        .asyncSaveAnexoExpediente(idExpedienteInvestigacion, form)
                        .then((idAnexoExpediente) => {
                            OnAdd({ ...form, idAnexoExpediente });
                        });
                } else {
                    OnAdd(form);
                    store.modalFormAnexoExpedienteActions.closeModal();
                }
                break;
            case FORM_TYPE.EDITAR:
                if (idExpedienteInvestigacion) {
                    store.modalFormAnexoExpedienteActions
                        .asyncUpdateAnexoExpediente(
                            idExpedienteInvestigacion,
                            modal.idAnexoExpediente,
                            form
                        )
                        .then(() => {
                            OnUpdate(modal.rowIndex, form);
                        });
                } else {
                    OnUpdate(modal.rowIndex, form);
                    store.modalFormAnexoExpedienteActions.closeModal();
                }
                break;
        }
    };

    const handleSearchExpediente = () => {
        // setLoadingExpediente(true);
        // GetPersona(form.numeroExpedienteAnexo)
        //   .then(expediente => {
        //     if (expediente) {
        //       setForm({
        //         nombres: persona.nombres,
        //         primerApellido: persona.primerApellido,
        //         segundoApellido: persona.segundoApellido
        //       });
        //       setFoundExpediente(true);
        //     } else {
        //       toast("No se encontró el expediente buscado.", "warning");
        //     }
        //     setLoadingExpediente(false);
        //   })
        //   .catch(() => {
        //     setLoadingExpediente(false);
        //   });
    };

    const handleRemoveExpediente = () => {
        setFoundExpediente(false);
        setForm(buildAnexoExpediente());
    };

    return (
        <>
            <ModalFormContainer
                open={modal.open}
                onClose={handleClose}
                onExited={store.modalFormAnexoExpedienteActions.resetModal}
                fullWidth
                maxWidth="sm"
                title={modal.title}
                onSubmit={() => {
                    confirm("Va a agregar el expediente ¿Continuar?").then(c => {
                        if (c) handleSave();
                    })
                }}
                loading={modal.loading || loadingExpediente}
                showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Número de Expediente"
                            value={form.numeroExpedienteAnexo}
                            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    numeroExpedienteAnexo: e.target.value
                                })
                            }
                            inputProps={{
                                maxLength: 15
                            }}
                        // InputProps={{
                        //   endAdornment: modal.formType != FORM_TYPE.CONSULTAR && (
                        //     <ButtonIconInputSearch
                        //       disabled={modal.loading}
                        //       found={foundExpediente}
                        //       onClickSearch={handleSearchExpediente}
                        //       onClickRemove={handleRemoveExpediente}
                        //     />
                        //   )
                        // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DatePicker
                            label="Fecha de Ingreso"
                            value={form.fechaExpedienteDocumentario}
                            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
                            fullWidth
                            onChange={date =>
                                setForm({
                                    ...form,
                                    fechaExpedienteDocumentario: date
                                })
                            }
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Remitente"
              value={form.remitente}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              label="Descripción"
              value={form.descripcion}
              disabled={true}
            />
          </Grid> */}
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="Folios"
                            value={form.folioExpediente}
                            disabled={modal.loading || modal.formType == FORM_TYPE.CONSULTAR}
                            onChange={e => HandleOnlyNumber(e, () => setForm({
                                ...form,
                                folioExpediente: e.target.value
                            }))}
                            inputProps={{
                                maxLength: 3,
                                type: "number",
                                min: 0
                            }}
                        />
                    </Grid>
                </Grid>
            </ModalFormContainer>
        </>
    );
};

export default FormAnexoExpediente;
