import { buildExpedienteInvestigacion } from "../../../_store/_initial-state";
import update from "immutability-helper";

export const PUSH_ANEXO_EXPEDIENTE = expediente => ({
  type: "PUSH-ANEXO-EXPEDIENTE",
  payload: { expediente }
});

export const UPDATE_ANEXO_EXPEDIENTE = (rowIndex, expediente) => ({
  type: "UPDATE-ANEXO-EXPEDIENTE",
  payload: { expediente, rowIndex }
});

export const PUSH_INVESTIGADO = investigado => ({
  type: "PUSH-INVESTIGADO",
  payload: { investigado }
});

export const UPDATE_INVESTIGADO = (rowIndex, investigado) => ({
  type: "UPDATE-INVESTIGADO",
  payload: { investigado, rowIndex }
});

/**
 * @param {import("../../../_store/_initial-state").IFormGestionInvestigacion} form
 */
export const FormGestionInvestigacionReducer = (form, action) => {
  switch (action.type) {
    case "RESET":
      return buildExpedienteInvestigacion();
    case "CHANGE-INPUT":
      return { ...form, [action.payload.prop]: action.payload.value };
    case "PUSH-FILES":
      return update(form, {
        archivos: {
          $push: action.payload.files
        }
      });
    case "PUSH-INVESTIGADO":
      return update(form, {
        investigados: {
          $push: [action.payload.investigado]
        }
      });
      case "PUSH-ANEXO-EXPEDIENTE":
      return update(form, {
        expedientes: {
          $push: [action.payload.expediente]
        }
      });
    case "PUSH-REQUERIMIENTO":
      return update(form, {
        requerimientos: {
          $push: [action.payload.requerimiento]
        }
      });

    case "SET_FORM":
      return action.payload.form;

    case "UPDATE-ANEXO-EXPEDIENTE":
      return update(form, {
        expedientes: {
          [action.payload.rowIndex]: { $set: action.payload.expediente }
        }
      });

      case "UPDATE-INVESTIGADO":
      return update(form, {
        investigados: {
          [action.payload.rowIndex]: { $set: action.payload.investigado }
        }
      });

    case "DELETE-ANEXO-EXPEDIENTE":
      return update(form, {
        expedientes: {
          $splice: [[action.payload.rowIndex, 1]]
        }
      });

    case "DELETE-INVESTIGADO":
      return update(form, {
        investigados: {
          $splice: [[action.payload.rowIndex, 1]]
        }
      });

    case "DELETE-REQUERIMIENTO":
      return update(form, {
        requerimientos: {
          $splice: [[action.payload.rowIndex, 1]]
        }
      });

    case "DELETE-FILE":
      return update(form, {
        archivos: {
          $splice: [[action.payload.rowIndex, 1]]
        }
      });
  }
};
