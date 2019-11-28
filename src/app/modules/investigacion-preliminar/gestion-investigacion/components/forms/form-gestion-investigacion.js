import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import confirm from "app/core/components/confirm";
import ModalFormContainer from "app/core/components/modal-form-container";
import { FORM_TYPE } from "app/core/enums/enums";
import React, { useEffect, useReducer, useState } from "react";
import { buildExpedienteInvestigacion } from "../../_store/_initial-state";
import GridArchivo from "../grids/grid-archivo";
import GridExpediente from "../grids/grid-expediente";
import GridInvestigado from "../grids/grid-investigado";
import GridRequerimiento from "../grids/grid-requerimiento";
import FormAnexoExpediente from "./form-anexo-expediente";
import FormArchivo from "./form-archivo";
import FormDatosGenerales from "./form-datos-generales";
import FormInvestigado from "./form-investigado";
import FormRequerimiento from "./form-requerimiento";
import {
    FormGestionInvestigacionReducer,
    PUSH_ANEXO_EXPEDIENTE,
    PUSH_INVESTIGADO,
    UPDATE_ANEXO_EXPEDIENTE,
    UPDATE_INVESTIGADO
} from "./reducers/form-gestion-investigacion.reducer";
import {
	AppConfig
} from "app/core/config/app.config";

const useStyles = makeStyles(theme => ({
    tabContainer: {
        marginTop: theme.spacing(3)
    }
}));

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
 * @param {import('../../_store/gestion-investigacion.store').GestionInvestigacionStore} store
 * @param {import('../../_store/_initial-state').modalGestionInvestigacion} modal
 * @param {*} form
 */
const handleSave = (modal, store, form) => {
    confirm("Va a guardar los datos registrados ¿Continuar?").then((c) => {
        if (c) {
            switch (modal.formType) {
                case FORM_TYPE.REGISTRAR:
                    store.modalGestionInvestigacionActions
                        .asyncSaveInvestigacion(form)
                        .then(() => {

                            store.buscadorInvestigacionActions.asyncFetchInvestigaciones();
                        });
                    break;
                case FORM_TYPE.EDITAR:
                    store.modalGestionInvestigacionActions
                        .asyncUpdateInvestigacion(modal.idExpedienteInvestigacion, form)
                        .then(() => {
                            store.buscadorInvestigacionActions.asyncFetchInvestigaciones();
                        });
                    break;
            }
        }
    });
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalGestionInvestigacion,
 *  store: import('../../_store/gestion-investigacion.store').GestionInvestigacionStore,
 *  modalFormArchivo: import('../../_store/_initial-state').modalFormArchivo,
 *  modalFormAnexoExpediente: import('../../_store/_initial-state').modalFormAnexoExpediente,
 *  modalFormInvestigado: import('../../_store/_initial-state').modalFormInvestigado,
 *  modalFormRequerimiento: import('../../_store/_initial-state').modalFormRequerimiento
 * }} param0
 */
const FormGestionInvestigacion = ({
    modal,
    store,
    modalFormArchivo,
    modalFormAnexoExpediente,
    modalFormInvestigado,
    modalFormRequerimiento
}) => {
    const [tab, setTab] = useState(0);
    const [disabledFormChanges, setDisableFormChanges] = useState(false);

    const [form, dispatch] = useReducer(
        FormGestionInvestigacionReducer,
        buildExpedienteInvestigacion()
    );

    const classes = useStyles();

    useEffect(() => {
        if (modal.idExpedienteInvestigacion != null) {
            store.modalGestionInvestigacionActions.asyncGetInvestigacion(
                modal.idExpedienteInvestigacion
            );
        }
    }, [modal.idExpedienteInvestigacion]);

    useEffect(
        () => {
            setDisableFormChanges(true)
            dispatch({
                type: "SET_FORM",
                payload: { form: modal.expedienteInvestigacion }
            })
            setTimeout(() => {
                setDisableFormChanges(false)
            });
        },
        [modal.expedienteInvestigacion]
    );

    const handleExited = () => {
        setTab(0);
        dispatch({ type: "RESET" });
        store.modalGestionInvestigacionActions.resetModal();
    };

    const handleDeleteExpedienteAnexo = (rowIndex, idExpedienteAnexo) => {
        confirm("Va a eliminar el expediente. ¿Continuar?").then(c => {
            if (c) {
                if (modal.idExpedienteInvestigacion) {
                    store.modalGestionInvestigacionActions
                        .asyncDeleteAnexoExpediente(
                            modal.idExpedienteInvestigacion,
                            idExpedienteAnexo
                        )
                        .then(() => {
                            dispatch({
                                type: "DELETE-ANEXO-EXPEDIENTE",
                                payload: { rowIndex }
                            });
                        });
                } else {
                    dispatch({ type: "DELETE-ANEXO-EXPEDIENTE", payload: { rowIndex } });
                }
            }
        });
    };

    const handleDeleteInvestigado = (rowIndex, idInvestigado) => {
        confirm("Va a eliminar el investigado. ¿Continuar?").then(c => {
            if (c) {
                if (modal.idExpedienteInvestigacion) {
                    store.modalGestionInvestigacionActions
                        .asyncDeleteInvestigado(
                            modal.idExpedienteInvestigacion,
                            idInvestigado
                        )
                        .then(() => {
                            dispatch({
                                type: "DELETE-INVESTIGADO",
                                payload: { rowIndex }
                            });
                        });
                } else {
                    dispatch({ type: "DELETE-INVESTIGADO", payload: { rowIndex } });
                }
            }
        });
    };

    const handleDeleteArchivo = (rowIndex, idArchivoAdjunto) => {
        confirm("Va a eliminar el archivo. ¿Continuar?").then(c => {
            if (c) {
                if (modal.idExpedienteInvestigacion) {
                    store.modalGestionInvestigacionActions
                        .asyncDeleteArchivo(
                            modal.idExpedienteInvestigacion,
                            idArchivoAdjunto
                        )
                        .then(() => {
                            dispatch({
                                type: "DELETE-FILE",
                                payload: { rowIndex }
                            });
                        });
                } else {
                    dispatch({ type: "DELETE-FILE", payload: { rowIndex } });
                }
            }
        });
    };

    const handleDeleteRequerimiento = (rowIndex, idRequerimiento) => {
        confirm("Va a eliminar el requerimiento. ¿Continuar?").then(c => {
            if (c) {
                if (modal.idExpedienteInvestigacion) {
                    store.modalGestionInvestigacionActions
                        .asyncDeleteRequerimiento(
                            modal.idExpedienteInvestigacion,
                            idRequerimiento
                        )
                        .then(() => {
                            dispatch({
                                type: "DELETE-REQUERIMIENTO",
                                payload: { rowIndex }
                            });
                        });
                } else {
                    dispatch({ type: "DELETE-REQUERIMIENTO", payload: { rowIndex } });
                }
            }
        });
    };

    const loadFilters = () => {
        store.modalGestionInvestigacionActions.asyncLoadFilters();
    };

    const handleSaveArchivos = files => {

        if (modal.idExpedienteInvestigacion) {
            store.modalGestionInvestigacionActions.asyncSaveArchivos(modal.idExpedienteInvestigacion, files).then(_files => {
                dispatch({ type: "PUSH-FILES", payload: { files: _files } })
            });
        } else {
            dispatch({ type: "PUSH-FILES", payload: { files } })
        }

    }

    const handleSaveRequerimiento = requerimiento => {
        if (modal.idExpedienteInvestigacion) {
            store.modalGestionInvestigacionActions.asyncSaveRequerimiento(modal.idExpedienteInvestigacion, requerimiento).then(id => {
                dispatch({ type: "PUSH-REQUERIMIENTO", payload: { requerimiento: { ...requerimiento, idArchivoAdjunto: id } } })
            });
        } else {
            dispatch({ type: "PUSH-REQUERIMIENTO", payload: { requerimiento } })
        }
	 }
	 
	 const handleDownloadFile = name => {
		window.location.href = `${AppConfig.urlFileServer}${name}`;
	 };


    return (
        <>
            <ModalFormContainer
                open={modal.open}
                onClose={handleClose(
                    modal.formType,
                    store.modalGestionInvestigacionActions.closeModal
                )}
                title={modal.title}
                onExited={handleExited}
                onSubmit={() => handleSave(modal, store, form)}
                loading={modal.loading}
                maxWidth="lg"
                fullWidth
                showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
                onEnter={loadFilters}
                cancelLabel={modal.formType == FORM_TYPE.EDITAR ? "Cerrar" : null}
            >
                <Tabs
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Datos Generales" />
                    <Tab label="Datos de la Hoja de Trámite" />
                    <Tab label="Datos del investigado(a)" />
                    <Tab label="Archivos Adjuntos" />
                    <Tab label="Requerimientos" />
                </Tabs>
                <div className={classes.tabContainer}>
                    {tab == 0 && (
                        <FormDatosGenerales
                            form={form}
                            setInput={(prop, value) => {
                                dispatch({
                                    type: "CHANGE-INPUT",
                                    payload: { prop, value }
                                });
                            }}
                            loading={modal.loading}
                            filterLists={modal.filterLists}
                            formType={modal.formType}
                            errors={modal.errors}
                            disabledFormChanges={disabledFormChanges}
                        />
                    )}
                    {tab == 1 && (
                        <div>
                            <GridExpediente
                                expedientes={form.expedientes}
                                onClickNew={store.modalFormAnexoExpedienteActions.openModal}
                                onClickShow={
                                    store.modalFormAnexoExpedienteActions.openModalShow
                                }
                                onClickEdit={
                                    store.modalFormAnexoExpedienteActions.openModalUpdate
                                }
                                onClickDelete={handleDeleteExpedienteAnexo}
                                readonly={modal.formType == FORM_TYPE.CONSULTAR}
                            />
                        </div>
                    )}
                    {tab == 2 && (
                        <GridInvestigado
                            investigados={form.investigados}
                            onClickNew={store.modalFormInvestigadoActions.openModal}
                            onClickShow={store.modalFormInvestigadoActions.openModalShow}
                            onClickEdit={store.modalFormInvestigadoActions.openModalUpdate}
                            onClickDelete={handleDeleteInvestigado}
                            readonly={modal.formType == FORM_TYPE.CONSULTAR}
                        />
                    )}
                    {tab == 3 && (
                        <GridArchivo
                            archivos={form.archivos}
                            onClickUpload={store.modalFormArchivoActions.openModal}
                            onClickShow={handleDownloadFile}
                            onClickDelete={handleDeleteArchivo}
                            readonly={modal.formType == FORM_TYPE.CONSULTAR}
                        />
                    )}
                    {tab == 4 && (
                        <GridRequerimiento
                            requerimientos={form.requerimientos}
                            onClickNew={store.modalFormRequerimientoActions.openModal}
                            onClickShow={handleDownloadFile}
                            onClickDelete={handleDeleteRequerimiento}
                            readonly={modal.formType == FORM_TYPE.CONSULTAR}
                        />
                    )}
                </div>
            </ModalFormContainer>

            <FormAnexoExpediente
                store={store}
                modal={modalFormAnexoExpediente}
                idExpedienteInvestigacion={modal.idExpedienteInvestigacion}
                OnAdd={expediente => dispatch(PUSH_ANEXO_EXPEDIENTE(expediente))}
                OnUpdate={(rowIndex, expediente) =>
                    dispatch(UPDATE_ANEXO_EXPEDIENTE(rowIndex, expediente))
                }
            />

            <FormInvestigado
                store={store}
                modal={modalFormInvestigado}
                idExpedienteInvestigacion={modal.idExpedienteInvestigacion}
                OnAdd={investigado => dispatch(PUSH_INVESTIGADO(investigado))}
                OnUpdate={(rowIndex, investigado) =>
                    dispatch(UPDATE_INVESTIGADO(rowIndex, investigado))
                }
            />

            <FormArchivo
                store={store}
                modal={modalFormArchivo}
                onUploadFinish={handleSaveArchivos}
            />

            <FormRequerimiento
                store={store}
                modal={modalFormRequerimiento}
                onUploadFinish={handleSaveRequerimiento}
            />
        </>
    );
};

export default FormGestionInvestigacion;
