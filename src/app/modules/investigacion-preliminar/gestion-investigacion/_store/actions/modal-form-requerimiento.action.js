/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalFormRequerimientoActions {
  /**
   * @param {() => import('../_initial-state').modalFormRequerimiento} getState
   * @param {(state:import('../_initial-state').modalFormRequerimiento ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  openModal = () => {
    this.setState({ ...this.getState(), open: true });
  };

  closeModal = () => {
    this.setState({
      ...this.getState(),
      open: false
    });
  };

  setLoading = loading => {
    this.setState({ ...this.getState(), isLoading: loading });
  };
}
