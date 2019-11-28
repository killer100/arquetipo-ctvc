import { BaseStore } from "app/core/store/base-store";
import { BuscadorTituloActions } from "./actions/buscador-titulo.action";
import { NormaDataActions } from "./actions/norma-data.action";
import { ModalGestionTituloActions } from "./actions/modal-gestion-titulo.action";

export class GestionTituloStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').initialState} getState
   * @param {(state:import('./_initial-state').initialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorTituloActions = new BuscadorTituloActions(
      this.buildScopedGetState("buscadorTitulo"),
      this.buildScopedSetState("buscadorTitulo")
    );

    this.modalGestionTituloActions = new ModalGestionTituloActions(
      this.buildScopedGetState("modalGestionTitulo"),
      this.buildScopedSetState("modalGestionTitulo")
    );

    this.normaDataActions = new NormaDataActions(
      this.buildScopedGetState("normaData"),
      this.buildScopedSetState("normaData")
    );
  }
}
