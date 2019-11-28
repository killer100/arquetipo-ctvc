import { BuscadorInvestigacionActions } from "./actions/buscador-investigacion.action";
import { BaseStore } from "app/core/store/base-store";
import { ModalGestionInvestigacionActions } from "./actions/modal-gestion-investigacion.action";
import { ModalFormAnexoExpedienteActions } from "./actions/modal-form-anexo-expediente.action";
import { ModalFormInvestigacionActions } from "./actions/modal-form-investigado.action";
import { ModalFormArchivoActions } from "./actions/modal-form-archivo.action";
import { ModalFormRequerimientoActions } from "./actions/modal-form-requerimiento.action";

export class GestionInvestigacionStore extends BaseStore {
  /**
   * @param {() => import('./_initial-state').intialState} getState
   * @param {(state:import('./_initial-state').intialState, callback?: () => void ) => void} setState
   */
  constructor(getState, setState) {
    super(getState, setState);
    this.buscadorInvestigacionActions = new BuscadorInvestigacionActions(
      this.buildScopedGetState("buscadorInvestigacion"),
      this.buildScopedSetState("buscadorInvestigacion")
    );

    this.modalGestionInvestigacionActions = new ModalGestionInvestigacionActions(
      this.buildScopedGetState("modalGestionInvestigacion"),
      this.buildScopedSetState("modalGestionInvestigacion")
    );

    this.modalFormAnexoExpedienteActions = new ModalFormAnexoExpedienteActions(
      this.buildScopedGetState("modalFormAnexoExpediente"),
      this.buildScopedSetState("modalFormAnexoExpediente")
    );

    this.modalFormInvestigadoActions = new ModalFormInvestigacionActions(
      this.buildScopedGetState("modalFormInvestigado"),
      this.buildScopedSetState("modalFormInvestigado")
    );

    this.modalFormArchivoActions = new ModalFormArchivoActions(
      this.buildScopedGetState("modalFormArchivo"),
      this.buildScopedSetState("modalFormArchivo")
    );

    this.modalFormRequerimientoActions = new ModalFormRequerimientoActions(
      this.buildScopedGetState("modalFormRequerimiento"),
      this.buildScopedSetState("modalFormRequerimiento")
    );
  }
}
