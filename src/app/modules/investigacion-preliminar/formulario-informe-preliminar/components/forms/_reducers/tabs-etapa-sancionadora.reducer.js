import update from "immutability-helper";
import { FORM_TYPE } from "app/core/enums/enums";
import {
  GetEtapa3,
  SaveEtapa3,
  UpdateEtapa3,
  SaveSolicitudInformeOral,
  DeleteSolicitudInformeOral,
  SaveActaInformeOral,
  DeleteActaInformeOral
} from "../../../api/etapa3.api";

// =======================================
// INITIAL STATE
// =======================================

export const defaultState = {
  modalConslusionResolucion: {
    open: false
  },
  formType: FORM_TYPE.REGISTRAR,
  loading: false,
  errors: {
    remisionInformeOi: { errors: null },
    programacionInformeOral: { errors: null }
  },
  form: {
    remisionInformeOi: {
      numeroCarta: "",
      fechaCarta: null,
      observacion: "",
      descArchivoRemiteInfoOi: "",
      nomArchivoRemiteInfoOi: ""
    },
    programaInformeOral: {
      numeroCarta: "",
      fechaCarta: null,
      observacion: "",
      descArchivoRespInfoOral: "",
      nomArchivoRespInfoOral: ""
    },
    archivosSolicitudInformeOral: [],
    archivosActaInformeOral: []
  }
};

// =======================================
// ACTIONS
// =======================================

const RESET = () => ({ type: "RESET" });
const SHOW_LOADING = () => ({ type: "SHOW_LOADING" });
const HIDE_LOADING = () => ({ type: "HIDE_LOADING" });
const SET_FORM = form => ({ type: "SET_FORM", payload: { form } });
const SET_FORM_TYPE = formType => ({
  type: "SET_FORM_TYPE",
  payload: { formType }
});
const SET_ERRORS = errors => ({ type: "SET_ERRORS", payload: { errors } });

const CHANGE_INPUT_REMISION = (prop, value) => ({
  type: "CHANGE_INPUT_REMISION",
  payload: { prop, value }
});

const CHANGE_INPUT_PROGRAMA_IO = (prop, value) => ({
  type: "CHANGE_INPUT_PROGRAMA_IO",
  payload: { prop, value }
});

const PUSH_DOCS_SOLICITUD_IO = files => ({
  type: "PUSH_DOCS_SOLICITUD_IO",
  payload: { files }
});

const DELETE_DOCS_SOLICITUD_IO = rowIndex => ({
  type: "DELETE_DOCS_SOLICITUD_IO",
  payload: { rowIndex }
});

const PUSH_ARCHIVO_IO = files => ({
  type: "PUSH_ARCHIVO_IO",
  payload: { files }
});

const DELETE_ARCHIVO_IO = rowIndex => ({
  type: "DELETE_ARCHIVO_IO",
  payload: { rowIndex }
});

const OPEN_MODAL_CONC_RESOL = () => ({ type: "OPEN_MODAL_CONC_RESOL" });

const CLOSE_MODAL_CONC_RESOL = () => ({ type: "CLOSE_MODAL_CONC_RESOL" });

const CLEAR_ERRORS = () => ({ type: "CLEAR_ERRORS" });

//
const SET_REMITE_INFORME_OI = remisionInformeOi => ({
  type: "SET_REMITE_INFORME_OI",
  payload: { remisionInformeOi }
});

const SET_PROGRAMA_INFORME_ORAL = programaInformeOral => ({
  type: "SET_PROGRAMA_INFORME_ORAL",
  payload: { programaInformeOral }
});

const SET_ARCHIVOS_SOLICITUD_IO = archivosSolicitudInformeOral => ({
  type: "SET_ARCHIVOS_SOLICITUD_IO",
  payload: { archivosSolicitudInformeOral }
});

const SET_ARCHIVOS_ACTA_IO = archivosActaInformeOral => ({
  type: "SET_ARCHIVOS_ACTA_IO",
  payload: { archivosActaInformeOral }
});
//
//////////

const ASYNC_GET_ETAPA3 = dispatch => idExpedienteInvestigacion => {
  dispatch(SHOW_LOADING());
  return GetEtapa3(idExpedienteInvestigacion).then(resp => {
    dispatch(HIDE_LOADING());
    if (resp.data.etapa3) {
      if (resp.data.etapa3.remisionInformeOi) {
        dispatch(SET_REMITE_INFORME_OI(resp.data.etapa3.remisionInformeOi));
      }

      if (resp.data.etapa3.programaInformeOral) {
        dispatch(SET_PROGRAMA_INFORME_ORAL(resp.data.etapa3.programaInformeOral));
      }

      if (resp.data.etapa3.archivosSolicitudInformeOral) {
        dispatch(SET_ARCHIVOS_SOLICITUD_IO(resp.data.etapa3.archivosSolicitudInformeOral));
      }

      if (resp.data.etapa3.archivosActaInformeOral) {
        dispatch(SET_ARCHIVOS_ACTA_IO(resp.data.etapa3.archivosActaInformeOral));
      }
    }
  });
};

const ASYNC_SAVE_ETAPA3 = dispatch => formEtapa3 => {
  dispatch(SHOW_LOADING());
  dispatch(CLEAR_ERRORS());
  return SaveEtapa3(formEtapa3)
    .then(resp => {
      dispatch(HIDE_LOADING());
      return resp.msg;
    })
    .catch(err => {
      dispatch(HIDE_LOADING());
      const errors = err.data && err.data.errors ? err.data.errors : {
        remisionInformeOi: { errors: null },
        programacionInformeOral: { errors: null }
      };
      dispatch(SET_ERRORS(errors));
      throw errors;
    });
};

const ASYNC_UPDATE_ETAPA3 = dispatch => (
  idExpedienteInvestigacion,
  formEtapa3
) => {
  dispatch(SHOW_LOADING());
  dispatch(CLEAR_ERRORS());
  return UpdateEtapa3(idExpedienteInvestigacion, formEtapa3)
    .then(resp => {
      dispatch(HIDE_LOADING());
      return resp.msg;
    })
    .catch(err => {
      dispatch(HIDE_LOADING());
      const errors = err.data && err.data.errors ? err.data.errors : {
        remisionInformeOi: { errors: null },
        programacionInformeOral: { errors: null }
      };
      dispatch(SET_ERRORS(errors));
      throw errors;
    });
};

const ASYNC_SAVE_SOLICITUD_INFORME_ORAL = dispatch => (
  idExpedienteInvestigacion,
  files
) => {
  dispatch(SHOW_LOADING());

  return new Promise(async resolve => {
    let filesResponse = [];
    try {
      for (const i in files) {
        const resp = await SaveSolicitudInformeOral(
          idExpedienteInvestigacion,
          files[i]
        );
        filesResponse.push({
          ...files[i],
          idArchivoAdjunto: resp.data.id
        });
      }

      dispatch(HIDE_LOADING());
      resolve(filesResponse);
    } catch (e) {
      console.log(e);
      dispatch(HIDE_LOADING());
    }
  });
};

const ASYNC_DELETE_SOLICITUD_INFORME_ORAL = dispatch => (
  idExpedienteInvestigacion,
  idArchivoAdjunto
) => {
  dispatch(SHOW_LOADING());
  return DeleteSolicitudInformeOral(
    idExpedienteInvestigacion,
    idArchivoAdjunto
  ).then(() => {
    dispatch(HIDE_LOADING());
    return null;
  });
};

const ASYNC_SAVE_ACTA_INFORME_ORAL = dispatch => (
  idExpedienteInvestigacion,
  files
) => {
  dispatch(SHOW_LOADING());

  return new Promise(async resolve => {
    let filesResponse = [];
    try {
      for (const i in files) {
        const resp = await SaveActaInformeOral(
          idExpedienteInvestigacion,
          files[i]
        );
        filesResponse.push({
          ...files[i],
          idArchivoAdjunto: resp.data.id
        });
      }

      dispatch(HIDE_LOADING());
      resolve(filesResponse);
    } catch (e) {
      console.log(e);
      dispatch(HIDE_LOADING());
    }
  });
};

const ASYNC_DELETE_ACTA_INFORME_ORAL = dispatch => (
  idExpedienteInvestigacion,
  idArchivoAdjunto
) => {
  dispatch(SHOW_LOADING());
  return DeleteActaInformeOral(
    idExpedienteInvestigacion,
    idArchivoAdjunto
  ).then(() => {
    dispatch(HIDE_LOADING());
    return null;
  });
};

export const ACTIONS = {
  RESET,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_FORM,
  SET_FORM_TYPE,
  SET_ERRORS,
  CHANGE_INPUT_REMISION,
  CHANGE_INPUT_PROGRAMA_IO,
  PUSH_DOCS_SOLICITUD_IO,
  DELETE_DOCS_SOLICITUD_IO,
  PUSH_ARCHIVO_IO,
  DELETE_ARCHIVO_IO,
  OPEN_MODAL_CONC_RESOL,
  CLOSE_MODAL_CONC_RESOL,
  ASYNC_GET_ETAPA3,
  ASYNC_SAVE_ETAPA3,
  ASYNC_UPDATE_ETAPA3,
  ASYNC_SAVE_SOLICITUD_INFORME_ORAL,
  ASYNC_DELETE_SOLICITUD_INFORME_ORAL,
  ASYNC_SAVE_ACTA_INFORME_ORAL,
  ASYNC_DELETE_ACTA_INFORME_ORAL
};

// =======================================
// REDUCER
// =======================================

/**
 * @param {defaultState} state
 */
export const TabsEtapaSancionadoraReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return defaultState;

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

    case "CHANGE_INPUT_REMISION":
      return update(state, {
        form: {
          remisionInformeOi: {
            [action.payload.prop]: { $set: action.payload.value }
          }
        }
      });
    case "CHANGE_INPUT_PROGRAMA_IO":
      return update(state, {
        form: {
          programaInformeOral: {
            [action.payload.prop]: { $set: action.payload.value }
          }
        }
      });
    case "PUSH_DOCS_SOLICITUD_IO":
      return update(state, {
        form: {
          archivosSolicitudInformeOral: {
            $push: action.payload.files
          }
        }
      });

    case "DELETE_DOCS_SOLICITUD_IO":
      return update(state, {
        form: {
          archivosSolicitudInformeOral: {
            $splice: [[action.payload.rowIndex, 1]]
          }
        }
      });

    case "PUSH_ARCHIVO_IO":
      return update(state, {
        form: {
          archivosActaInformeOral: {
            $push: action.payload.files
          }
        }
      });

    case "DELETE_ARCHIVO_IO":
      return update(state, {
        form: {
          archivosActaInformeOral: {
            $splice: [[action.payload.rowIndex, 1]]
          }
        }
      });

    case "SET_FORM":
      return update(state, {
        form: { $set: action.payload.form }
      });

    case "OPEN_MODAL_CONC_RESOL":
      return update(state, {
        modalConslusionResolucion: {
          open: { $set: true }
        }
      });

    case "CLOSE_MODAL_CONC_RESOL":
      return update(state, {
        modalConslusionResolucion: {
          open: { $set: false }
        }
      });

    case "CLEAR_ERRORS":
      return update(state, {
        errors: {
          $set: {
            remisionInformeOi: { errors: null },
            programacionInformeOral: { errors: null }
          }
        }
      });

    case "SET_REMITE_INFORME_OI":
      return update(state, {
        form: {
          remisionInformeOi: { $set: action.payload.remisionInformeOi }
        }
      });

    case "SET_PROGRAMA_INFORME_ORAL":
      return update(state, {
        form: {
          programaInformeOral: { $set: action.payload.programaInformeOral }
        }
      });

    case "SET_ARCHIVOS_SOLICITUD_IO":
      return update(state, {
        form: {
          archivosSolicitudInformeOral: { $set: action.payload.archivosSolicitudInformeOral }
        }
      });

    case "SET_ARCHIVOS_ACTA_IO":
      return update(state, {
        form: {
          archivosActaInformeOral: { $set: action.payload.archivosActaInformeOral }
        }
      });

    default:
      return state;

  }
};
