import update from "immutability-helper";
import { buildModalGestionTitulo } from "../_initial-state";
import { FORM_TYPE } from "app/core/enums/enums";
import { UpdateTitulo, SaveTitulo, GetTitulo } from "../../api/titulo.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionTituloActions {
  /**
   * @param {() => import('../_initial-state').modalGestionTitulo} getState
   * @param {(state:import('../_initial-state').modalGestionTitulo ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  openModalNew = () => {
    this.setState({ ...this.getState(), open: true });
  };

  openModalShow = idTitulo => {
    this.setState({
      ...this.getState(),
      open: true,
      idTitulo,
      formType: FORM_TYPE.CONSULTAR,
      title: "Ver Titulo"
    });
  };

  openModalEdit = idTitulo => {
    this.setState({
      ...this.getState(),
      open: true,
      idTitulo,
      formType: FORM_TYPE.EDITAR,
      title: "Editar Titulo"
    });
  };

  closeModal = () => {
    this.setState({ ...this.getState(), open: false });
  };

  resetModal = () => {
    this.setState(buildModalGestionTitulo());
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
  // GET TITULO
  //=========================================

  getTituloSuccess = titulo => {
    this.setState({
      ...this.getState(),
      titulo: titulo,
      loading: false
    });
  };

  asyncGetTitulo = idTitulo => {
    this.setLoading(true);
    GetTitulo(idTitulo)
      .then(resp => {
        this.getTituloSuccess(resp.data.titulo);
      })
      .catch(err => {
        this.setLoading(false);
      });
  };

  //=========================================
  // SAVE TITULO
  //=========================================

  saveTituloBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  saveTituloSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  saveTituloError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncSaveTitulo = titulo => {
    this.setLoading(true);
    return SaveTitulo(titulo)
      .then(resp => {
        this.saveTituloSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.saveTituloError(errors);
      });
  };

  //=========================================
  // UPDATE TITULO
  //=========================================

  updateTituloBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  updateTituloSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  updateTituloError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncUpdateTitulo = (idTitulo, titulo) => {
    this.setLoading(true);
    return UpdateTitulo(idTitulo, titulo)
      .then(resp => {
        this.updateTituloSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.updateTituloError(errors);
      });
  };
}
