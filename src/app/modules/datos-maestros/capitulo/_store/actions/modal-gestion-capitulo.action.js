import update from "immutability-helper";
import { buildModalGestionCapitulo } from "../_initial-state";
import { FORM_TYPE } from "app/core/enums/enums";
import { SaveCapitulo, UpdateCapitulo, GetCapitulo } from "../../api/capitulo.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionCapituloActions {
  /**
   * @param {() => import('../_initial-state').modalGestionCapitulo} getState
   * @param {(state:import('../_initial-state').modalGestionCapitulo ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  openModalNew = () => {
    this.setState({ ...this.getState(), open: true });
  };

  openModalShow = idCapitulo => {
    this.setState({
      ...this.getState(),
      open: true,
      idCapitulo,
      formType: FORM_TYPE.CONSULTAR,
      title: "Ver Capítulo"
    });
  };

  openModalEdit = idCapitulo => {
    this.setState({
      ...this.getState(),
      open: true,
      idCapitulo,
      formType: FORM_TYPE.EDITAR,
      title: "Editar Capítulo"
    });
  };

  closeModal = () => {
    this.setState({ ...this.getState(), open: false });
  };

  resetModal = () => {
    this.setState(buildModalGestionCapitulo());
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
  // GET CAPITULO
  //=========================================

  getCapituloSuccess = capitulo => {
    this.setState({
      ...this.getState(),
      capitulo: capitulo,
      loading: false
    });
  };

  asyncGetCapitulo = idCapitulo => {
    this.setLoading(true);
    GetCapitulo(idCapitulo)
      .then(resp => {
        this.getCapituloSuccess(resp.data.capitulo);
      })
      .catch(err => {
        this.setLoading(false);
      });
  };

  //=========================================
  // SAVE CAPITULO
  //=========================================

  saveCapituloBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  saveCapituloSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  saveCapituloError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncSaveCapitulo = capitulo => {
    this.setLoading(true);
    return SaveCapitulo(capitulo)
      .then(resp => {
        this.saveCapituloSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.saveCapituloError(errors);
      });
  };

  //=========================================
  // UPDATE CAPITULO
  //=========================================

  updateCapituloBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  updateCapituloSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  updateCapituloError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncUpdateCapitulo = (idCapitulo, capitulo) => {
    this.setLoading(true);
    return UpdateCapitulo(idCapitulo, capitulo)
      .then(resp => {
        this.updateCapituloSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.updateCapituloError(errors);
      });
  };
}
