import { BaseStore } from "app/core/store/base-store";
import { BuscadorNormaActions } from "./actions/buscador-norma.action";
import { ModalGestionNormaActions } from "./actions/modal-gestion-norma.action";

export class GestionNormaStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').intialState} getState
   * @param {(state:import('./_initial-state').intialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorNormaActions = new BuscadorNormaActions(
      this.buildScopedGetState("buscadorNorma"),
      this.buildScopedSetState("buscadorNorma")
    );

    this.modalGestionNormaActions = new ModalGestionNormaActions(
      this.buildScopedGetState("modalGestionNorma"),
      this.buildScopedSetState("modalGestionNorma")
    );
  }
}
