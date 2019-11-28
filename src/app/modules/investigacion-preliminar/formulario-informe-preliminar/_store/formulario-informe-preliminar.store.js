import { BaseStore } from "app/core/store/base-store";
import { ContainerInformePreliminarActions } from "./actions/container-informe-preliminar.action";
import { ModalCartaInicioPadActions } from "./actions/modal-carta-inicio-pad.action";
import { ModalDestinoNotificacionActions } from "./actions/modal-destino-notificacion.action";
import { ContainerEtapasActions } from "./actions/container-etapas.action";

export class FormularioInformePreliminarStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').initialState} getState
   * @param {(state:import('./_initial-state').initialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.containerInformePreliminarActions = new ContainerInformePreliminarActions(
      this.buildScopedGetState("containerInformePreliminar"),
      this.buildScopedSetState("containerInformePreliminar")
    );

    this.modalCartaInicioPadActions = new ModalCartaInicioPadActions(
      this.buildScopedGetState("modalCartaInicioPad"),
      this.buildScopedSetState("modalCartaInicioPad")
    );

    this.modalDestinoNotificacionActions = new ModalDestinoNotificacionActions(
      this.buildScopedGetState("modalDestinoNotificacion"),
      this.buildScopedSetState("modalDestinoNotificacion")
    );

    this.containerEtapasActions = new ContainerEtapasActions(
      this.buildScopedGetState("containerEtapas"),
      this.buildScopedSetState("containerEtapas"))
  }
}
