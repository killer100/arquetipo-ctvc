import update from "immutability-helper";
import {
    GetPageInvestigacion,
    DeleteInvestigacion
} from "../../api/investigacion.api";
import {
    FetchAbogados,
    FetchEstadosExpediente,
    FetchDependencias
} from "app/core/api/maestros.api";
import Axios from "axios";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class BuscadorInvestigacionActions {
    /**
     * @param {() => import('../_initial-state').buscadorInvestigacion} getState
     * @param {(state:import('../_initial-state').buscadorInvestigacion ) => void} setState
     */
    constructor(getState, setState) {
        this.getState = getState;
        this.setState = setState;
    }

    loadFirstAsyncData = () => { };

    /**
     * @param {any[]} newColumns
     */
    addColumns = newColumns => {
        return new Promise(resolve => {
            this.setState(
                update(this.getState(), {
                    tableDef: {
                        columns: { $push: newColumns }
                    }
                }),
                () => resolve()
            );
        });
    };

    deleteInvestigacionBegin = () => {
        this.setState({ ...this.getState(), loading: true });
    };

    deleteInvestigacionSuccess = () => {
        this.setState({ ...this.getState(), loading: false });
    };

    //= ============================================
    // Acciones asincronas
    //= ============================================



    fetchInvestigacionesSuccess = (items, total, page, pageSize) => {
        const newState = update(this.getState(), {
            loading: { $set: false },
            pagination: {
                $set: {
                    items: items,
                    page: page,
                    pageSize: pageSize,
                    total: total
                }
            }
        });

        this.setState(newState);
    };

    fetchInvestigacionesError = () => {
        const state = this.getState();
        this.setState({
            ...state,
            loading: false,
            pagination: {
                ...state,
                items: [],
                page: 1,
                total: 0
            }
        });
    }

    asyncFetchInvestigaciones = (
        page = null,
        pageSize = null,
        filters = null
    ) => {
        const state = this.getState();
        if (!page) page = state.pagination.page;
        if (!pageSize) pageSize = state.pagination.pageSize;
        if (!filters) filters = state.filters;

        this.setState({ ...state, loading: true, filters });
        GetPageInvestigacion(page, pageSize, filters).then(response => {
            const { items, total } = response.data;
            this.fetchInvestigacionesSuccess(items, total, page, pageSize);
        }).catch((err) => {
            this.fetchInvestigacionesError();
        });
    };

    asyncDeleteInvestigacion = id => {
        this.deleteInvestigacionBegin();
        return DeleteInvestigacion(id).then(response => {
            this.deleteInvestigacionSuccess();
            return response;
        });
    };

    //=================================================
    //FETCH FILTROS
    //=================================================

    fetchFiltersBegin = () => {
        const state = this.getState();
        this.setState(
            update(state, {
                filterLists: {
                    abogados: { loading: { $set: true } },
                    dependencias: { loading: { $set: true } },
                    estados: { loading: { $set: true } }
                }
            })
        );
    };

    fetchFiltersSuccess = (abogados, dependencias, estados) => {
        const state = this.getState();
        this.setState(
            update(state, {
                filterLists: {
                    abogados: { $set: { value: abogados, loading: false } },
                    dependencias: { $set: { value: dependencias, loading: false } },
                    estados: { $set: { value: estados, loading: false } }
                }
            })
        );
    };

    asyncFetchFilters = () => {
        this.fetchFiltersBegin();
        Axios.all([
            FetchAbogados(),
            FetchDependencias(),
            FetchEstadosExpediente()
        ]).then(
            Axios.spread((abogados, dependencias, estados) => {
                this.fetchFiltersSuccess(abogados, dependencias, estados);
            })
        );
    };
}
