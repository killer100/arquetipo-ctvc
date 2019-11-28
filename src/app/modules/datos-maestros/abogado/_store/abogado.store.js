import { BuscadorAbogadoActions } from "./actions/buscador-abogados.action";
import { ModalGestionAbogadoActions } from "./actions/modal-gestion-abogado.action";
import { BaseStore } from "app/core/store/base-store";

export class AbogadoStore extends BaseStore {
  /**
   * @typedef {{
   *  buscadorAbogadoActions: BuscadorAbogadoActions
   *  modalGestionAbogadoActions: ModalGestionAbogadoActions
   * }} abogadoStoreType
   * @param {() => import('./_initial-state').intialState} getState
   * @param {(state:import('./_initial-state').intialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorAbogadoActions = new BuscadorAbogadoActions(
      this.buildScopedGetState("buscadorAbogados"),
      this.buildScopedSetState("buscadorAbogados")
    );

    this.modalGestionAbogadoActions = new ModalGestionAbogadoActions(
      this.buildScopedGetState("modalGestionAbogado"),
      this.buildScopedSetState("modalGestionAbogado")
    );
  }
}
