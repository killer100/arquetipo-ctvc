import { BaseStore } from "app/core/store/base-store";
import { BuscadorArticuloActions } from "./actions/buscador-articulo.action";
import { CapituloDataActions } from "./actions/capitulo-data.action";
import { ModalGestionArticuloActions } from "./actions/modal-gestion-articulo.action";

export class GestionArticuloStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').initialState} getState
   * @param {(state:import('./_initial-state').initialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorArticuloActions = new BuscadorArticuloActions(
      this.buildScopedGetState("buscadorArticulo"),
      this.buildScopedSetState("buscadorArticulo")
    );

    this.modalGestionArticuloActions = new ModalGestionArticuloActions(
      this.buildScopedGetState("modalGestionArticulo"),
      this.buildScopedSetState("modalGestionArticulo")
    );

    this.capituloDataActions = new CapituloDataActions(
      this.buildScopedGetState("capituloData"),
      this.buildScopedSetState("capituloData")
    );
  }
}
