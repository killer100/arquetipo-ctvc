import { GetNorma } from "app/modules/datos-maestros/norma/api/norma.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class NormaDataActions {
  /**
   * @param {() => import('../_initial-state').normaData} getState
   * @param {(state:import('../_initial-state').normaData ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  setIdNorma = idNorma => {
    this.setState({ ...this.getState(), idNorma });
    GetNorma(idNorma).then(resp => {
      this.setState({ ...this.getState(), norma: resp.data.norma });
    });
  };

  setNorma = norma => {
    this.setState({ ...this.getState(), norma });
  };
}
