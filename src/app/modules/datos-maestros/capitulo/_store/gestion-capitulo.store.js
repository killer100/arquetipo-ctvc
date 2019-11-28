import { BaseStore } from "app/core/store/base-store";
import { BuscadorCapituloActions } from "./actions/buscador-capitulo.action";
import { TituloDataActions } from "./actions/titulo-data.action";
import { ModalGestionCapituloActions } from "./actions/modal-gestion-capitulo.action";

export class GestionCapituloStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').initialState} getState
   * @param {(state:import('./_initial-state').initialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorCapituloActions = new BuscadorCapituloActions(
      this.buildScopedGetState("buscadorCapitulo"),
      this.buildScopedSetState("buscadorCapitulo")
    );

    this.modalGestionCapituloActions = new ModalGestionCapituloActions(
      this.buildScopedGetState("modalGestionCapitulo"),
      this.buildScopedSetState("modalGestionCapitulo")
    );

    this.tituloDataActions = new TituloDataActions(
      this.buildScopedGetState("tituloData"),
      this.buildScopedSetState("tituloData")
    );
  }
}
