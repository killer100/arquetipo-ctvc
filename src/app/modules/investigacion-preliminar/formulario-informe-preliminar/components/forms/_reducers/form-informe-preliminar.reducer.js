import { buildInformePreliminar } from "../../../_store/_initial-state";
import update from "immutability-helper";

export const ACTION_RESET = () => ({ type: "RESET" });

export const CHANGE_INPUT = (prop, value) => ({
  type: "CHANGE-INPUT",
  payload: { prop, value }
});

export const PUSH_FALTA = falta => ({ type: "PUSH-FALTA", payload: { falta } });

export const SET_FORM = form => ({ type: "SET-FORM", payload: { form } });

export const DELETE_FALTA = rowIndex => ({
  type: "DELETE-FALTA",
  payload: { rowIndex }
});

/**
 * @param {import("../../../_store/_initial-state").IFormInformePreliminar} form
 */
export const FormInformePreliminarReducer = (form, action) => {
  switch (action.type) {
    case "RESET":
      return buildInformePreliminar();
    case "CHANGE-INPUT":
      return { ...form, [action.payload.prop]: action.payload.value };
    case "PUSH-FALTA":
      return update(form, {
        faltas: {
          $push: [action.payload.falta]
        }
      });

    case "DELETE-FALTA":
      return update(form, {
        faltas: {
          $splice: [[action.payload.rowIndex, 1]]
        }
      });
    case "SET-FORM":
      return action.payload.form;
  }
};
