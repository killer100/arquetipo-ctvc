import { buildCartaInicioPad } from "../../../_store/_initial-state";
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
export const FormCartaInicioPadReducer = (form, action) => {
  switch (action.type) {
    case "RESET":
      return buildCartaInicioPad();
    case "CHANGE-INPUT":
      return { ...form, [action.payload.prop]: action.payload.value };
    case "SET-FORM":
      return action.payload.form;
  }
};
