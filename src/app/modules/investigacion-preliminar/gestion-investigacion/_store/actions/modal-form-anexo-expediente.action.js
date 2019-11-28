import { buildModalFormAnexoExpediente } from "../_initial-state";
import { FORM_TYPE } from "app/core/enums/enums";
import {
  GetAnexoExpediente,
  SaveAnexoExpediente,
  UpdateAnexoExpediente
} from "../../api/investigacion.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalFormAnexoExpedienteActions {
  /**
   * @param {() => import('../_initial-state').modalFormAnexoExpediente} getState
   * @param {(state:import('../_initial-state').modalFormAnexoExpediente ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  openModal = () => {
    this.setState({ ...this.getState(), open: true });
  };

  openModalUpdate = (rowIndex, idAnexoExpediente) => {
    this.setState({
      ...this.getState(),
      open: true,
      formType: FORM_TYPE.EDITAR,
      rowIndex: rowIndex,
        idAnexoExpediente: idAnexoExpediente,
        title: "Editar Expediente Anexo"
    });
  };

  openModalShow = idAnexoExpediente => {
    this.setState({
      ...this.getState(),
      open: true,
      formType: FORM_TYPE.CONSULTAR,
        idAnexoExpediente: idAnexoExpediente,
        title: "Ver Expediente Anexo"
    });
  };

  closeModal = () => {
    this.setState({ ...this.getState(), open: false });
  };

  resetModal = () => {
    this.setState(buildModalFormAnexoExpediente());
  };

  setLoading = show => {
    this.setState({
      ...this.getState(),
      loading: show
    });
  };

  //=========================================
  // GET ANEXO EXPEDIENTE
  //=========================================

  getAnexoExpedienteSuccess = expediente => {
    this.setState({
      ...this.getState(),
      expediente: expediente,
      loading: false
    });
  };

    asyncGetAnexoExpediente = (idExpedienteInvestigacion, idAnexoExpediente) => {
    this.setLoading(true);
        GetAnexoExpediente(idExpedienteInvestigacion, idAnexoExpediente)
      .then(resp => {
        this.getAnexoExpedienteSuccess(resp.data.anexoExpediente);
      })
      .catch(err => {
        this.setLoading(false);
      });
  };

  //=========================================
  // SAVE ANEXO EXPEDIENTE
  //=========================================

  saveAnexoExpedienteBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  saveAnexoExpedienteSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  saveAnexoExpedienteError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncSaveAnexoExpediente = (idExpedienteInvestigacion, anexoExpediente) => {
    this.saveAnexoExpedienteBegin();
    return SaveAnexoExpediente(idExpedienteInvestigacion, anexoExpediente)
      .then(resp => {
        this.saveAnexoExpedienteSuccess();
        return resp.data.id;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.saveAnexoExpedienteError(errors);
      });
  };

  //=========================================
  // UPDATE ANEXO EXPEDIENTE
  //=========================================

  updateAnexoExpedienteBegin = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors: null
    });
  };

  updateAnexoExpedienteSuccess = () => {
    this.setState({
      ...this.getState(),
      loading: false,
      open: false
    });
  };

  updateAnexoExpedienteError = errors => {
    this.setState({
      ...this.getState(),
      loading: false,
      errors
    });
  };

  asyncUpdateAnexoExpediente = (
    idExpedienteInvestigacion,
    idAnexoExpediente,
    anexoExpediente
  ) => {
    this.updateAnexoExpedienteBegin();
    return UpdateAnexoExpediente(
      idExpedienteInvestigacion,
      idAnexoExpediente,
      anexoExpediente
    )
      .then(resp => {
        this.updateAnexoExpedienteSuccess();
        return null;
      })
      .catch(err => {
        const errors = err.data && err.data.errors ? err.data.errors : null;
        this.updateAnexoExpedienteError(errors);
      });
  };
}
