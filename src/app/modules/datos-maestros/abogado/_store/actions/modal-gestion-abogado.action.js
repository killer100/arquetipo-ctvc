import update from 'immutability-helper'
import { FORM_TYPE } from 'app/core/enums/enums'
import { buildModalAbogado } from '../_initial-state'
import { GetAbogado, UpdateAbogado, SaveAbogado } from '../../api/abogado.api'

/**
 * Acciones que gestionarán el contexto del Modal de gestión de abogados
 * dentro del estado
 */
export class ModalGestionAbogadoActions {
    /**
     * @param {() => import('../_initial-state').modalGestionAbogado} getState
     * @param {(state:import('../_initial-state').modalGestionAbogado ) => void} setState
     */
    constructor(getState, setState) {
        this.getState = getState
        this.setState = setState
    }

    openModalNew = () => {
        this.setState({ ...this.getState(), open: true })
    }

    openModalShow = id => {
        const state = this.getState()

        this.setState(
            update(state, {
                title: { $set: 'Ver Abogado' },
                formType: { $set: FORM_TYPE.CONSULTAR },
                idAbogado: { $set: id },
                open: { $set: true }
            })
        )
    }

    openModalUpdate = id => {
        this.setState(
            update(this.getState(), {
                title: { $set: 'Editar Abogado' },
                formType: { $set: FORM_TYPE.EDITAR },
                idAbogado: { $set: id },
                open: { $set: true }
            })
        )
    }

    closeModal = () => {
        this.setState({
            ...this.getState(),
            open: false
        })
    }

    resetModal = () => {
        this.setState(buildModalAbogado())
    }

    setModal = newModalState => {
        this.setState(newModalState)
    }

    getAbogadoBegin = () => {
        this.setState({ ...this.getState(), loading: true })
    }

    getAbogadoSuccess = abogado => {
        this.setState({ ...this.getState(), abogado, loading: false })
    }

    setLoading = (show) => {
        this.setState({ ...this.getState(), loading: show })
    }

    //= ============================================
    // Acciones asincronas
    //= ============================================

    asyncGetAbogado = id => {
        this.getAbogadoBegin()
        return GetAbogado(id).then(response => {
            this.getAbogadoSuccess(response.data.abogado)
            return response.data.abogado
        })
    }

    //=========================================
    // SAVE ABOGADO
    //=========================================

    saveAbogadoBegin = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors: null
        });
    };

    saveAbogadoSuccess = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            open: false
        });
    };

    saveAbogadoError = errors => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors
        });
    };

    asyncSaveAbogado = abogado => {
        this.setLoading(true);
        return SaveAbogado(abogado)
            .then(resp => {
                this.saveAbogadoSuccess();
                return null;
            })
            .catch(err => {
                const errors = err.data && err.data.errors ? err.data.errors : null;
                this.saveAbogadoError(errors);
            });
    };

    //=========================================
    // UPDATE ABOGADO
    //=========================================

    updateAbogadoBegin = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors: null
        });
    };

    updateAbogadoSuccess = () => {
        this.setState({
            ...this.getState(),
            loading: false,
            open: false
        });
    };

    updateAbogadoError = errors => {
        this.setState({
            ...this.getState(),
            loading: false,
            errors
        });
    };

    asyncUpdateAbogado = (idAbogado, abogado) => {
        this.setLoading(true);
        return UpdateAbogado(idAbogado, abogado)
            .then(resp => {
                this.updateAbogadoSuccess();
                return null;
            })
            .catch(err => {
                const errors = err.data && err.data.errors ? err.data.errors : null;
                this.updateAbogadoError(errors);
            });
    };
}
