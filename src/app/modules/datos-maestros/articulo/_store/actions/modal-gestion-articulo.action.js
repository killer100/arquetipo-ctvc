import update from "immutability-helper";
import { buildModalGestionArticulo } from "../_initial-state";
import { FORM_TYPE } from "app/core/enums/enums";
import {
  GetArticulo,
  SaveArticulo,
  UpdateArticulo
} from "../../api/articulo.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionArticuloActions {
  /**
   * @param {() => import('../_initial-state').modalGestionArticulo} getState
   * @param {(state:import('../_initial-state').modalGestionArticulo ) => void} setState
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

  openModalShow = idArticulo => {
    this.setState({
      ...this.getState(),
      open: true,
      idArticulo,
      formType: FORM_TYPE.CONSULTAR,
      title: "Ver Artículo"
    });
  };

  openModalEdit = idArticulo => {
    this.setState({
      ...this.getState(),
      open: true,
      idArticulo,
      formType: FORM_TYPE.EDITAR,
      title: "Editar Artículo"
    });
  };

  closeModal = () => {
    this.setState({
      ...this.getState(),
      open: false
    });
  };

  resetModal = () => {
    this.setState(buildModalGestionArticulo());
  };

  setErrors = errors => {
    this.setState({
      ...this.getState(),
      errors: errors
    });
  };

  setLoading = show => {
    this.setState({
      ...this.getState(),
      loading: show
    });
  };

  //=========================================
  // GET ARTICULO
  //=========================================

  getArticuloSuccess = articulo => {
    this.setState({
      ...this.getState(),
      articulo: articulo,
      loading: false
    });
  };

  asyncGetArticulo = idArticulo => {
    this.setLoading(true);
    GetArticulo(idArticulo)
      .then(resp => {
        this.getArticuloSuccess(resp.data.articulo);
      })
      .catch(err => {
        this.setLoading(false);
      });
  };

  //=========================================
  // SAVE ARTICULO
  //=========================================

  saveArticuloBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  saveArticuloSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  saveArticuloError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncSaveArticulo = articulo => {
    this.setLoading(true);
    return SaveArticulo(articulo)
      .then(resp => {
        this.saveArticuloSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.saveArticuloError(errors);
      });
  };

  //=========================================
  // UPDATE ARTICULO
  //=========================================

  updateArticuloBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  updateArticuloSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  updateArticuloError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncUpdateArticulo = (idArticulo, articulo) => {
    this.setLoading(true);
    return UpdateArticulo(idArticulo, articulo)
      .then(resp => {
        this.updateArticuloSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.updateArticuloError(errors);
      });
  };
}
