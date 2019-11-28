import update from "immutability-helper";
import { GetPageArticulo, DeleteArticulo } from "../../api/articulo.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class BuscadorArticuloActions {
  /**
   * @param {() => import('../_initial-state').buscadorArticulo} getState
   * @param {(state:import('../_initial-state').buscadorArticulo ) => void} setState
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

  fetchArticulosBegin = () => {
    this.setState({
      ...this.getState(),
      loading: true
    });
  };

  fetchArticulosSuccess = (items, total, page, pageSize) => {
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

  asyncFetchArticulos = (
    idCapitulo,
    page = null,
    pageSize = null,
    filters = null
  ) => {
    const state = this.getState();
    if (!page) page = state.pagination.page;
    if (!pageSize) pageSize = state.pagination.pageSize;
    if (!filters) filters = state.filters;

    this.fetchArticulosBegin();

    GetPageArticulo(idCapitulo, page, pageSize, filters).then(response => {
      const { items, total } = response.data;
      this.fetchArticulosSuccess(items, total, page, pageSize);
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
  // DELETE ARTICULO
  //=========================================

  asyncDeleteArticulo = idArticulo => {
    this.setLoading(true);
    DeleteArticulo(idArticulo)
      .then(resp => {
        this.setLoading(false);
        this.asyncFetchArticulos();
      })
      .catch(() => {
        this.setLoading(false);
      });
  };
}
