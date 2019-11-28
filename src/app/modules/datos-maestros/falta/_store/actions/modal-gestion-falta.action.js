import update from "immutability-helper";
import { buildModalGestionFalta } from "../_initial-state";
import { FORM_TYPE } from "app/core/enums/enums";
import { UpdateFalta, SaveFalta, GetFalta } from "../../api/falta.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionFaltaActions {
  /**
   * @param {() => import('../_initial-state').modalGestionFalta} getState
   * @param {(state:import('../_initial-state').modalGestionFalta ) => void} setState
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

  openModalShow = idFalta => {
    this.setState({
      ...this.getState(),
      open: true,
      idFalta,
      formType: FORM_TYPE.CONSULTAR,
      title: "Ver Falta"
    });
  };

  openModalEdit = idFalta => {
    this.setState({
      ...this.getState(),
      open: true,
      idFalta,
      formType: FORM_TYPE.EDITAR,
      title: "Editar Falta"
    });
  };

  closeModal = () => {
    this.setState({
      ...this.getState(),
      open: false
    });
  };

  resetModal = () => {
    this.setState(buildModalGestionFalta());
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
  // GET FALTA
  //=========================================

  getFaltaSuccess = falta => {
    this.setState({
      ...this.getState(),
      falta: falta,
      loading: false
    });
  };

  asyncGetFalta = idFalta => {
    this.setLoading(true);
    GetFalta(idFalta)
      .then(resp => {
        this.getFaltaSuccess(resp.data.falta);
      })
      .catch(err => {
        this.setLoading(false);
      });
  };

  //=========================================
  // SAVE FALTA
  //=========================================

  saveFaltaBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  saveFaltaSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  saveFaltaError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncSaveFalta = falta => {
    this.setLoading(true);
    return SaveFalta(falta)
      .then(resp => {
        this.saveFaltaSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.saveFaltaError(errors);
      });
  };

  //=========================================
  // UPDATE FALTA
  //=========================================

  updateFaltaBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  updateFaltaSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  updateFaltaError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncUpdateFalta = (idFalta, falta) => {
    this.setLoading(true);
    return UpdateFalta(idFalta, falta)
      .then(resp => {
        this.updateFaltaSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.updateFaltaError(errors);
      });
  };
}
