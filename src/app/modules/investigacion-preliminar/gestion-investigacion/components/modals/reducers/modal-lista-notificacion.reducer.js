import update from "immutability-helper";
import { GetNotificacionesPorExpedienteInvestigacion } from "../../../api/destino-notificacion.api";
// =======================================
// INITIAL STATE
// =======================================
export const defaultModal = {
  title: "Notificaciones",
  loading: false,
  notificaciones: []
};

// =======================================
// ACTIONS
// =======================================

const RESET = () => ({ type: "RESET" });
const SHOW_LOADING = () => ({ type: "SHOW_LOADING" });
const HIDE_LOADING = () => ({ type: "HIDE_LOADING" });
const SET_TITLE = title => ({ type: "SET_TITLE", payload: { title } });
const SET_NOTIFICACIONES = notificaciones => ({
  type: "SET_NOTIFICACIONES",
  payload: { notificaciones }
});

///

const ASYNC_GET_NOTIFICACIONES = dispatch => idExpedienteInvestigacion => {
  dispatch(SHOW_LOADING());
  return GetNotificacionesPorExpedienteInvestigacion(
    idExpedienteInvestigacion
  ).then(resp => {
    dispatch(HIDE_LOADING());
    dispatch(SET_NOTIFICACIONES(resp.data.notificaciones));
  });
};

///

export const ACTIONS = {
  RESET,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_TITLE,
  SET_NOTIFICACIONES,
  ASYNC_GET_NOTIFICACIONES
};

// =======================================
// REDUCER
// =======================================
/**
 * @param {defaultModal} modal
 */
export const ModalListaNotificacionReducer = (modal, action) => {
  switch (action.type) {
    case "RESET":
      return defaultModal;

    case "SHOW_LOADING":
      return update(modal, {
        loading: { $set: true }
      });

    case "HIDE_LOADING":
      return update(modal, {
        loading: { $set: false }
      });

    case "SET_TITLE":
      return update(modal, {
        title: { $set: action.payload.title }
      });

    case "SET_NOTIFICACIONES":
      return update(modal, {
        notificaciones: { $set: action.payload.notificaciones }
      });

    default:
      return modal;
  }
};
