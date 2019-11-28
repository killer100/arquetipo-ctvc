import { buildModalGestionInvestigacion } from "../_initial-state";
import update from "immutability-helper";
import {
    SaveInvestigacion,
    UpdateInvestigacion,
    GetInvestigacion,
    DeleteInvestigado,
    DeleteAnexoExpediente,
    DeleteRequerimiento,
    DeleteArchivo,
    SaveArchivo,
    SaveRequerimiento
} from "../../api/investigacion.api";
import Axios from "axios";
import { FetchAbogados } from "app/core/api/maestros.api";
import { FORM_TYPE } from "../../../../../core/enums/enums";
/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionInvestigacionActions {
    /**
     * @param {() => import('../_initial-state').modalGestionInvestigacion} getState
     * @param {(state:import('../_initial-state').modalGestionInvestigacion ) => void} setState
     */
    constructor(getState, setState) {
        this.getState = getState;
        this.setState = setState;
    }

    openModalNew = () => {
        this.setState({
            ...this.getState(),
            open: true
        });
    };

    openModalUpdate = (idExpedienteInvestigacion) => {
        this.setState({
            ...this.getState(),
            open: true,
            title: "Editar Expediente de Denuncia",
            formType: FORM_TYPE.EDITAR,
            idExpedienteInvestigacion
        });
    };

    openModalShow = (idExpedienteInvestigacion) => {
        this.setState({
            ...this.getState(),
            open: true,
            title: "Ver Expediente de Denuncia",
            formType: FORM_TYPE.CONSULTAR,
            idExpedienteInvestigacion
        });
    };

    closeModal = () => {
        this.setState({
            ...this.getState(),
            open: false
        });
    };

    resetModal = () => {
        this.setState(buildModalGestionInvestigacion());
    };

    setLoading = show => {
        this.setState({
            ...this.getState(),
            loading: show
        });
    };

    asyncLoadFilters = () => {
        this.setState(
            update(this.getState(), {
                filterLists: {
                    abogado: { loading: { $set: true } }
                }
            })
        );

        Axios.all([FetchAbogados()])
            .then(
                Axios.spread(abogados => {
                    this.setState(update(this.getState(), {
                        filterLists: {
                            abogado: { $set: { loading: false, value: abogados } }
                        }
                    }));
                })
            )
            .catch(() => {
                this.setState(update(this.getState(), {
                    filterLists: {
                        abogado: { loading: { $set: false } }
                    }
                }));
            });
    };

    //=========================================
    // GET INVESTIGACION
    //=========================================

    getInvestigacionSuccess = expedienteInvestigacion => {
        const state = this.getState();
        this.setState({
            ...state,
            expedienteInvestigacion: expedienteInvestigacion,
            title: `${state.title} - N° ${expedienteInvestigacion.numeroExpediente}`,
            loading: false
        });
    };

    asyncGetInvestigacion = idExpedienteInvestigacion => {
        this.setLoading(true);
        GetInvestigacion(idExpedienteInvestigacion)
            .then(resp => {
                this.getInvestigacionSuccess(resp.data.expedienteInvestigacion);
            })
            .catch(err => {
                this.setLoading(false);
            });
    };

    //=========================================
    // SAVE INVESTIGACION
    //=========================================

    saveInvestigacionBegin = () => {
        this.setState({
            ...this.getState(),
            loading: true,
            errors: null
        });
    };

    saveInvestigacionSuccess = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            open: false
        });
    };

    saveInvestigacionError = errors => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors
        });
    };

    asyncSaveInvestigacion = expedienteInvestigacion => {
        this.saveInvestigacionBegin();
        return SaveInvestigacion(expedienteInvestigacion)
            .then(resp => {
                this.saveInvestigacionSuccess();
                return null;
            })
            .catch(err => {
                const errors = err.data && err.data.errors ? err.data.errors : null;
                this.saveInvestigacionError(errors);
                throw err;
            });
    };

    //=========================================
    // UPDATE INVESTIGACION
    //=========================================

    updateInvestigacionBegin = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors: null
        });
    };

    updateInvestigacionSuccess = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            open: false
        });
    };

    updateInvestigacionError = errors => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors
        });
    };

    asyncUpdateInvestigacion = (
        idExpedienteInvestigacion,
        expedienteInvestigacion
    ) => {
        this.updateInvestigacionBegin();
        return UpdateInvestigacion(
            idExpedienteInvestigacion,
            expedienteInvestigacion
        )
            .then(resp => {
                this.updateInvestigacionSuccess();
                return null;
            })
            .catch(err => {
                const errors = err.data && err.data.errors ? err.data.errors : null;
                this.updateInvestigacionError(errors);
            });
    };

    // addInvestigacionArchivos = files => {
    //   const newState = update(this.getState(), {
    //     expedienteInvestigacion: {
    //       archivos: {
    //         $push: files
    //       }
    //     }
    //   });
    //   this.setState(newState);
    // };

    //=========================================
    // DELETES
    //=========================================

    asyncDeleteInvestigado = (idExpedienteInvestigacion, idInvestigado) => {
        this.setLoading(true);
        return DeleteInvestigado(idExpedienteInvestigacion, idInvestigado).then(
            () => {
                this.setLoading(false);
                return null;
            }
        );
    };

    asyncDeleteAnexoExpediente = (
        idExpedienteInvestigacion,
        idAnexoExpediente
    ) => {
        this.setLoading(true);
        return DeleteAnexoExpediente(
            idExpedienteInvestigacion,
            idAnexoExpediente
        ).then(() => {
            this.setLoading(false);
            return null;
        });
    };

    asyncDeleteRequerimiento = (idExpedienteInvestigacion, idRequerimiento) => {
        this.setLoading(true);
        return DeleteRequerimiento(idExpedienteInvestigacion, idRequerimiento).then(
            () => {
                this.setLoading(false);
                return null;
            }
        );
    };

    asyncDeleteArchivo = (idExpedienteInvestigacion, idArchivoAdjunto) => {
        this.setLoading(true);
        return DeleteArchivo(idExpedienteInvestigacion, idArchivoAdjunto).then(
            () => {
                this.setLoading(false);
                return null;
            }
        );
    };


    //=========================================
    // GUARDAR ARCHIVOS
    //=========================================
       
    asyncSaveArchivos = (idExpedienteInvestigacion, files) => {
        this.setLoading(true);
        return new Promise(async (resolve) => {
         
            let filesResponse = [];
            try {                

                for (const i in files) {                   
                    const resp = await SaveArchivo(idExpedienteInvestigacion, files[i]);
                    filesResponse.push({ ...files[i], idArchivoAdjunto: resp.data.id });
                }

                this.setLoading(false);
                resolve(filesResponse);

            } catch (e) {
                console.log(e);
                this.setLoading(false);
            }
        });
    }

    asyncSaveRequerimiento = (idExpedienteInvestigacion, requerimiento) => {
        this.setLoading(true);
        return SaveRequerimiento(idExpedienteInvestigacion, requerimiento).then(
            (resp) => {
                this.setLoading(false);
                return resp.data.id;
            }
        );
    }
}
