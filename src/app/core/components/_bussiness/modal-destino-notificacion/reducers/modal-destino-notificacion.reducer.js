import update from "immutability-helper";
import {
  SaveDestinoNotificacion,
  UpdateDestinoNotificacion,
  SaveAnexo,
  DeleteAnexo,
  GetDestinoNotificacion
} from "app/core/api/destino-notificacion.api";
import { FORM_TYPE } from "app/core/enums/enums";

// =======================================
// INITIAL STATE
// =======================================

export const defaultState = {
  loading: false,
  formType: FORM_TYPE.REGISTRAR,
  errors: null,
  title: "Registro del Dato de Notificación",
  form: {
    idDestinoNotificacion: null,
    idExpedienteInvestigacion: null,
    idEstadoExpediente: null,
    idRegion: "",
    descripcionRegion: "",
    idProvincia: "",
    descripcionProvincia: "",
    idDistrito: "",
    descripcionDistrito: "",
    direccion: "",
    folio: "",
    anexos: []
  }
};

// =======================================
// ACTIONS
// =======================================

const RESET = () => ({
  type: "RESET"
});

const CHANGE_INPUT = (prop, value) => ({
  type: "CHANGE_INPUT",
  payload: {
    prop,
    value
  }
});

const PUSH_ANEXO = anexo => ({
  type: "PUSH_ANEXO",
  payload: {
    anexo
  }
});

const SET_FORM = form => ({
  type: "SET_FORM",
  payload: {
    form
  }
});

const DELETE_ANEXO = rowIndex => ({
  type: "DELETE_ANEXO",
  payload: {
    rowIndex
  }
});

const SET_FORM_TYPE = formType => ({
  type: "SET_FORM_TYPE",
  payload: { formType }
});

const SET_ERRORS = errors => ({ type: "SET_ERRORS", payload: { errors } });

const SHOW_LOADING = () => ({ type: "SHOW_LOADING" });

const HIDE_LOADING = () => ({ type: "HIDE_LOADING" });

const SET_TITLE = () => ({ type: "SET_TITLE" });
const SET_DISTRITO = distrito => ({
  type: "SET_DISTRITO",
  payload: { distrito }
});
const CLEAR_DISTRITO = () => ({ type: "CLEAR_DISTRITO" });

const SAVE_NOTIFICACION_BEGIN = () => ({ type: "SAVE_NOTIFICACION_BEGIN" });
const SAVE_NOTIFICACION_SUCCESS = () => ({ type: "SAVE_NOTIFICACION_SUCCESS" });
const SAVE_NOTIFICACION_ERROR = errors => ({
  type: "SAVE_NOTIFICACION_ERROR",
  payload: { errors }
});

const UPDATE_NOTIFICACION_BEGIN = () => ({ type: "UPDATE_NOTIFICACION_BEGIN" });
const UPDATE_NOTIFICACION_SUCCESS = () => ({
  type: "UPDATE_NOTIFICACION_SUCCESS"
});
const UPDATE_NOTIFICACION_ERROR = errors => ({
  type: "UPDATE_NOTIFICACION_ERROR",
  payload: { errors }
});

const SAVE_ANEXO_BEGIN = () => ({ type: "SAVE_ANEXO_BEGIN" });
const SAVE_ANEXO_SUCCESS = () => ({ type: "SAVE_ANEXO_SUCCESS" });
const SAVE_ANEXO_ERROR = () => ({ type: "SAVE_ANEXO_ERROR" });

const DELETE_ANEXO_BEGIN = () => ({ type: "DELETE_ANEXO_BEGIN" });
const DELETE_ANEXO_SUCCESS = () => ({ type: "DELETE_ANEXO_SUCCESS" });
const DELETE_ANEXO_ERROR = () => ({ type: "DELETE_ANEXO_ERROR" });

const GET_NOTIFICACION_BEGIN = () => ({ type: "GET_NOTIFICACION_BEGIN" });
const GET_NOTIFICACION_SUCCESS = destinoNotificacion => ({
  type: "GET_NOTIFICACION_SUCCESS",
  payload: { destinoNotificacion }
});
const GET_NOTIFICACION_ERROR = () => ({ type: "GET_NOTIFICACION_ERROR" });

const ASYNC_SAVE_NOTIFICACION = dispatch => destinoNotificacion => {
  dispatch(SAVE_NOTIFICACION_BEGIN());

  return SaveDestinoNotificacion(destinoNotificacion)
    .then(resp => {
      dispatch(SAVE_NOTIFICACION_SUCCESS());
      return resp.data.id;
    })
    .catch(err => {
      const errors = err.data && err.data.errors ? err.data.errors : null;
      dispatch(SAVE_NOTIFICACION_ERROR(errors));
      throw err;
    });
};

const ASYNC_UPDATE_NOTIFICACION = dispatch => (
  idDestinoNotificacion,
  destinoNotificacion
) => {
  dispatch(UPDATE_NOTIFICACION_BEGIN());

  return UpdateDestinoNotificacion(idDestinoNotificacion, destinoNotificacion)
    .then(resp => {
      dispatch(UPDATE_NOTIFICACION_SUCCESS());
      return null;
    })
    .catch(err => {
      const errors = err.data && err.data.errors ? err.data.errors : null;
      dispatch(UPDATE_NOTIFICACION_ERROR(errors));
      throw err;
    });
};

const ASYNC_SAVE_ANEXO = dispatch => (idDestinoNotificacion, anexo) => {
  dispatch(SAVE_ANEXO_BEGIN());
  return SaveAnexo(idDestinoNotificacion, anexo)
    .then(response => {
      dispatch(SAVE_ANEXO_SUCCESS());
      return response.data.id;
    })
    .catch(err => {
      dispatch(SAVE_ANEXO_ERROR());
      return err;
    });
};

const ASYNC_DELETE_ANEXO = dispatch => (
  idDestinoNotificacion,
  idAnexoDestinoNotificacion
) => {
  dispatch(DELETE_ANEXO_BEGIN());
  return DeleteAnexo(idDestinoNotificacion, idAnexoDestinoNotificacion)
    .then(response => {
      dispatch(DELETE_ANEXO_SUCCESS());
      return response;
    })
    .catch(err => {
      dispatch(DELETE_ANEXO_ERROR());
      return err;
    });
};

const ASYNC_GET_NOTIFICACION = dispatch => idDestinoNotificacion => {
  dispatch(GET_NOTIFICACION_BEGIN());
  return GetDestinoNotificacion(idDestinoNotificacion)
    .then(response => {
      if (!response.data.destinoNotificacion.anexos) {
        response.data.destinoNotificacion.anexos = [];
      }
      dispatch(GET_NOTIFICACION_SUCCESS(response.data.destinoNotificacion));
      return response;
    })
    .catch(err => {
      dispatch(GET_NOTIFICACION_ERROR());
      return err;
    });
};

export const ACTIONS = {
  RESET,
  CHANGE_INPUT,
  PUSH_ANEXO,
  SET_FORM,
  DELETE_ANEXO,

  SET_FORM_TYPE,
  SET_ERRORS,
  SET_TITLE,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_DISTRITO,
  CLEAR_DISTRITO,
  ASYNC_SAVE_NOTIFICACION,
  ASYNC_UPDATE_NOTIFICACION,
  ASYNC_SAVE_ANEXO,
  ASYNC_DELETE_ANEXO,
  ASYNC_GET_NOTIFICACION
};

// =======================================
// REDUCER
// =======================================

/**
 * @param {defaultState} state
 */
export const ModalDestinoNotificacionReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return defaultState;

    case "CHANGE_INPUT":
      return update(state, {
        form: {
          [action.payload.prop]: { $set: action.payload.value }
        }
      });

    case "PUSH_ANEXO":
      return update(state, {
        form: {
          anexos: {
            $push: [action.payload.anexo]
          }
        }
      });

    case "SET_TITLE":
      return update(state, {
        title: {
          $set: action.payload.title
        }
      });

    case "SET_FORM":
      return update(state, {
        form: {
          $set: action.payload.form
        }
      });

    case "DELETE_ANEXO":
      return update(state, {
        form: {
          anexos: {
            $splice: [[action.payload.rowIndex, 1]]
          }
        }
      });

    case "SHOW_LOADING":
      return update(state, {
        loading: { $set: true }
      });

    case "HIDE_LOADING":
      return update(state, {
        loading: { $set: false }
      });

    case "SET_ERRORS":
      return update(state, {
        errors: { $set: action.payload.errors }
      });

    case "SET_FORM_TYPE":
      return update(state, {
        formType: { $set: action.payload.formType }
      });

    case "SET_DISTRITO":
      return update(state, {
        form: {
          $apply: f => ({
            ...f,
            ...action.payload.distrito
          })
        }
      });
    case "CLEAR_DISTRITO":
      return update(state, {
        form: {
          $apply: f => ({
            ...f,
            idRegion: "",
            descripcionRegion: "",
            idProvincia: "",
            descripcionProvincia: "",
            idDistrito: "",
            descripcionDistrito: ""
          })
        }
      });

    case "SAVE_NOTIFICACION_BEGIN":
      return update(state, {
        loading: { $set: true },
        errors: { $set: null }
      });

    case "SAVE_NOTIFICACION_SUCCESS":
      return update(state, {
        loading: { $set: false },
        errors: { $set: null }
      });

    case "SAVE_NOTIFICACION_ERROR":
      return update(state, {
        loading: { $set: false },
        errors: { $set: action.payload.errors }
      });

    case "UPDATE_NOTIFICACION_BEGIN":
      return update(state, {
        loading: { $set: true },
        errors: { $set: null }
      });

    case "UPDATE_NOTIFICACION_SUCCESS":
      return update(state, {
        loading: { $set: false },
        errors: { $set: null }
      });

    case "UPDATE_NOTIFICACION_ERROR":
      return update(state, {
        loading: { $set: false },
        errors: { $set: action.payload.errors }
      });

    case "SAVE_ANEXO_BEGIN":
      return update(state, {
        loading: { $set: true }
      });

    case "SAVE_ANEXO_SUCCESS":
      return update(state, {
        loading: { $set: false }
      });

    case "SAVE_ANEXO_ERROR":
      return update(state, {
        loading: { $set: false }
      });

    case "DELETE_ANEXO_BEGIN":
      return update(state, {
        loading: { $set: true }
      });

    case "DELETE_ANEXO_SUCCESS":
      return update(state, {
        loading: { $set: false }
      });

    case "DELETE_ANEXO_ERROR":
      return update(state, {
        loading: { $set: false }
      });

    case "GET_NOTIFICACION_BEGIN":
      return update(state, {
        loading: { $set: true }
      });

    case "GET_NOTIFICACION_SUCCESS":
      return update(state, {
        loading: { $set: false },
        form: { $set: action.payload.destinoNotificacion }
      });

    case "GET_NOTIFICACION_ERROR":
      return update(state, {
        loading: { $set: false }
      });

    default:
      return state;
  }
};
