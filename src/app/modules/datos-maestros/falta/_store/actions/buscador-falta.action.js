import update from "immutability-helper";
import { GetPageFalta, DeleteFalta } from "../../api/falta.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class BuscadorFaltaActions {
  /**
   * @param {() => import('../_initial-state').buscadorFalta} getState
   * @param {(state:import('../_initial-state').buscadorFalta ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  addColumns = newColumns => {
    return new Promise(resolve => {
      this.setState(
        update(this.getState(), {
          gridDefinition: {
            columns: {
              $push: newColumns
            }
          }
        }),
        () => resolve()
      );
    });
  };

  setLoading = show => {
    this.setState({
      ...this.getState(),
      loading: show
    });
  };

  //= ============================================
  // Acciones asincronas
  //= ============================================

  fetchFaltasBegin = () => {
    this.setState({
      ...this.getState(),
      loading: true
    });
  };

  fetchFaltasSuccess = (items, total, page, pageSize) => {
    const newState = update(this.getState(), {
      loading: {
        $set: false
      },
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

  asyncFetchFaltas = (
    idArticulo,
    page = null,
    pageSize = null,
    filters = null
  ) => {
    const state = this.getState();
    if (!page) page = state.pagination.page;
    if (!pageSize) pageSize = state.pagination.pageSize;
    if (!filters) filters = state.filters;

    this.fetchFaltasBegin();

    GetPageFalta(idArticulo, page, pageSize, filters).then(response => {
      const { items, total } = response.data;
      this.fetchFaltasSuccess(items, total, page, pageSize);
    });
  };

  // asyncDeleteInvestigacion = id => {
  // 	this.deleteInvestigacionBegin();
  // 	return DeleteInvestigacion(id).then(response => {
  // 		this.deleteInvestigacionSuccess();
  // 		return response;
  // 	});
  // };

  //=========================================
  // DELETE FALTA
  //=========================================

  asyncDeleteFalta = idFalta => {
    this.setLoading(true);
    DeleteFalta(idFalta)
      .then(resp => {
        this.setLoading(false);
        this.asyncFetchFaltas();
      })
      .catch(() => {
        this.setLoading(false);
      });
  };
}
