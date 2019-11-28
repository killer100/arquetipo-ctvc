import { GetCapitulo } from "app/modules/datos-maestros/capitulo/api/capitulo.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class CapituloDataActions {
  /**
   * @param {() => import('../_initial-state').capituloData} getState
   * @param {(state:import('../_initial-state').capituloData ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  setIdCapitulo = idCapitulo => {
    this.setState({ ...this.getState(), idCapitulo });
    GetCapitulo(idCapitulo).then(resp => {
      this.setState({ ...this.getState(), capitulo: resp.data.capitulo });
    });
  };

  setCapitulo = capitulo => {
    this.setState({ ...this.getState(), capitulo });
  };
}
