import { buildModalFormInvestigado } from "../_initial-state";
import {
    GetInvestigado,
    SaveInvestigado,
    UpdateInvestigado
} from "../../api/investigacion.api";
import { FORM_TYPE } from "app/core/enums/enums";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalFormInvestigacionActions {
    /**
     * @param {() => import('../_initial-state').modalFormInvestigado} getState
     * @param {(state:import('../_initial-state').modalFormInvestigado ) => void} setState
     */
    constructor(getState, setState) {
        this.getState = getState;
        this.setState = setState;
    }

    openModal = () => {
        this.setState({ ...this.getState(), open: true });
    };

    closeModal = () => {
        this.setState({ ...this.getState(), open: false });
    };

    openModalUpdate = (rowIndex, idInvestigado) => {

        this.setState({
            ...this.getState(),
            open: true,
            formType: FORM_TYPE.EDITAR,
            rowIndex: rowIndex,
            idInvestigado: idInvestigado,
            title: "Editar Investigado"
        });
    };

    openModalShow = idInvestigado => {

        this.setState({
            ...this.getState(),
            open: true,
            formType: FORM_TYPE.CONSULTAR,
            idInvestigado: idInvestigado,
            title: "Ver Investigado"
        });
    };

    resetModal = () => {
        this.setState(buildModalFormInvestigado());
    };

    setLoading = show => {
        this.setState({
            ...this.getState(),
            loading: show
        });
    };

    setErrors = errors => {
        this.setState({
            ...this.getState(),
            errors: errors
        });
    };

    //=========================================
    // GET INVESTIGADO
    //=========================================

    getInvestigadoSuccess = investigado => {
        this.setState({
            ...this.getState(),
            investigado: investigado,
            loading: false
        });
    };

    asyncGetInvestigado = (idExpedienteInvestigacion, idInvestigado) => {
        this.setLoading(true);
        GetInvestigado(idExpedienteInvestigacion, idInvestigado)
            .then(resp => {
                this.getInvestigadoSuccess(resp.data.investigado);
            })
            .catch(err => {
                this.setLoading(false);
            });
    };

    //=========================================
    // SAVE INVESTIGADO
    //=========================================

    saveInvestigadoBegin = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors: null
        });
    };

    saveInvestigadoSuccess = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            open: false
        });
    };

    saveInvestigadoError = errors => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors
        });
    };

    asyncSaveInvestigado = (idInvestigado, investigado) => {
        this.saveInvestigadoBegin();
        return SaveInvestigado(idInvestigado, investigado)
            .then(resp => {
                this.saveInvestigadoSuccess();
                return resp.data.id;;
            })
            .catch(err => {
                const errors = err.data && err.data.errors ? err.data.errors : null;
                this.saveInvestigadoError(errors);
            });
    };

    //=========================================
    // UPDATE INVESTIGADO
    //=========================================

    updateInvestigadoBegin = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors: null
        });
    };

    updateInvestigadoSuccess = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            open: false
        });
    };

    updateInvestigadoError = errors => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors
        });
    };

    asyncUpdateInvestigado = (
        idExpedienteInvestigacion,
        idInvestigado,
        investigado
    ) => {
        this.updateInvestigadoBegin();
        return UpdateInvestigado(
            idExpedienteInvestigacion,
            idInvestigado,
            investigado
        )
            .then(resp => {
                this.updateInvestigadoSuccess();
                return null;
            })
            .catch(err => {
                const errors = err.data && err.data.errors ? err.data.errors : null;
                this.updateInvestigadoError(errors);
            });
    };
}
