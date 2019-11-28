/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalFormArchivoActions {
  /**
   * @param {() => import('../_initial-state').modalFormArchivo} getState
   * @param {(state:import('../_initial-state').modalFormArchivo ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  openModal = tipoArchivo => () => {
    this.setState({ ...this.getState(), open: true, tipoArchivo });
  };

  closeModal = () => {
    this.setState({
      ...this.getState(),
      open: false,
      tipoArchivo: { id: null, descripcion: "", icon: null }
    });
  };

  setLoading = loading => {
    this.setState({ ...this.getState(), isLoading: loading });
  };
}
