import { BaseStore } from "app/core/store/base-store";
import { BuscadorFaltaActions } from "./actions/buscador-falta.action";
import { ArticuloDataActions } from "./actions/articulo-data.action";
import { ModalGestionFaltaActions } from "./actions/modal-gestion-falta.action";

export class GestionFaltaStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').initialState} getState
   * @param {(state:import('./_initial-state').initialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorFaltaActions = new BuscadorFaltaActions(
      this.buildScopedGetState("buscadorFalta"),
      this.buildScopedSetState("buscadorFalta")
    );

    this.modalGestionFaltaActions = new ModalGestionFaltaActions(
      this.buildScopedGetState("modalGestionFalta"),
      this.buildScopedSetState("modalGestionFalta")
    );

    this.articuloDataActions = new ArticuloDataActions(
      this.buildScopedGetState("articuloData"),
      this.buildScopedSetState("articuloData")
    );
  }
}
