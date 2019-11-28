import update from "immutability-helper";
import { GetInvestigados } from "../../../api/informe-preliminar.api";
import { FetchTipoSancion } from "app/core/api/maestros.api";
import { FORM_TYPE } from "app/core/enums/enums";
import {
  GetResolucionConclusion,
  SaveResolucionConclusion,
  UpdateResolucionConclusion
} from "../../../api/resolucion-conclusion.api";
// =======================================
// INITIAL STATE
// =======================================
export const defaultState = {
  formType: FORM_TYPE.REGISTRAR,
  loading: false,
  investigados: "",
  form: {
    idResolucionConclusion: null,
    numeroResolucion: "",
    fechaResolucion: null,
    descArchivoResolucion: "",
    nomArchivoResolucion: "",
    idOrganoSancionador: "",
    descOrganoSancionador: "",
    idCargoOrganoSancionador: "",
    descCargoOrganoSancionador: "",
    diasSuspension: "",
    esArchivado: false
  },
  errors: {},
  comboLists: {
    tipoSancion: {
      value: [],
      loading: false
    }
  },
  modalNotificacion: {
    open: false
  }
};

// =======================================
// ACTIONS
// =======================================

const RESET = () => ({ type: "RESET" });
const SHOW_LOADING = () => ({ type: "SHOW_LOADING" });
const HIDE_LOADING = () => ({ type: "HIDE_LOADING" });
const SET_FORM = form => ({ type: "SET_FORM", payload: { form } });
const SET_INPUT = (prop, value) => ({
  type: "SET_INPUT",
  payload: { prop, value }
});
const SET_INVESTIGADOS = investigados => ({
  type: "SET_INVESTIGADOS",
  payload: { investigados }
});
const SET_FORM_TYPE = formType => ({
  type: "SET_FORM_TYPE",
  payload: { formType }
});

const SET_ERRORS = errors => ({ type: "SET_ERRORS", payload: { errors } });

const SET_DEFAULT_ORGANOS = etapas => ({
  type: "SET_DEFAULT_ORGANOS",
  payload: { etapas }
});

const FETCH_TIPO_SANCION_BEGIN = () => ({ type: "FETCH_TIPO_SANCION_BEGIN" });

const FETCH_TIPO_SANCION_SUCCESS = list => ({
  type: "FETCH_TIPO_SANCION_SUCCESS",
  payload: { list }
});

const ASYNC_GET_INVESTIGADOS = dispatch => idExpedienteInvestigacion => {
  const InvestigadosToString = investigados => {
    return investigados
      .map(x => `${x.nombres} ${x.primerApellido} ${x.segundoApellido}`)
      .join(", ");
  };

  GetInvestigados(idExpedienteInvestigacion).then(resp => {
    dispatch(SET_INVESTIGADOS(InvestigadosToString(resp.data.investigados)));
  });
};

const ASYNC_FETCH_TIPOS_SANCION = dispatch => {
  dispatch(FETCH_TIPO_SANCION_BEGIN());
  FetchTipoSancion().then(tipoSancion => {
    dispatch(FETCH_TIPO_SANCION_SUCCESS(tipoSancion));
  });
};
const OPEN_MODAL_NOTIFICACION = () => ({
  type: "OPEN_MODAL_NOTIFICACION"
});

const CLOSE_MODAL_NOTIFICACION = () => ({ type: "CLOSE_MODAL_NOTIFICACION" });

const SET_ID_DESTINO_NOTIFICACION = idDestinoNotificacion => ({
  type: "SET_ID_DESTINO_NOTIFICACION",
  payload: { idDestinoNotificacion }
});

///

const ASYNC_GET_RESOLUCION_CONCLUSION = dispatch => idResolucionConclusion => {
  dispatch(SHOW_LOADING());
  return GetResolucionConclusion(idResolucionConclusion).then(resp => {    
    dispatch(HIDE_LOADING());
    if(resp.data.resolucionConclusion && !resp.data.resolucionConclusion.diasSuspension){
      resp.data.resolucionConclusion.diasSuspension = '';
    }
    dispatch(SET_FORM(resp.data.resolucionConclusion));
  });
};

const ASYNC_SAVE_RESOLUCION_CONCLUSION = dispatch => resolucionConclusion => {
  dispatch(SHOW_LOADING());
  return SaveResolucionConclusion(resolucionConclusion)
    .then(resp => {
      dispatch(HIDE_LOADING());
      return resp.data.id;
    })
    .catch(err => {
      dispatch(HIDE_LOADING());
      const errors = err.data && err.data.errors ? err.data.errors : null;
      dispatch(SET_ERRORS(errors));
      throw errors;
    });
};

const ASYNC_UPDATE_RESOLUCION_CONCLUSION = dispatch => (
  idResolucionConclusion,
  resolucionConclusion
) => {
  dispatch(SHOW_LOADING());
  return UpdateResolucionConclusion(
    idResolucionConclusion,
    resolucionConclusion
  )
    .then(resp => {
      dispatch(HIDE_LOADING());
      return null;
    })
    .catch(err => {
      dispatch(HIDE_LOADING());
      const errors = err.data && err.data.errors ? err.data.errors : null;
      dispatch(SET_ERRORS(errors));
      throw errors;
    });
};

///

export const ACTIONS = {
  RESET,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_FORM,
  SET_INPUT,
  SET_INVESTIGADOS,
  SET_FORM_TYPE,
  SET_ERRORS,
  SET_DEFAULT_ORGANOS,
  ASYNC_GET_INVESTIGADOS,
  ASYNC_FETCH_TIPOS_SANCION,
  OPEN_MODAL_NOTIFICACION,
  CLOSE_MODAL_NOTIFICACION,
  SET_ID_DESTINO_NOTIFICACION,
  ASYNC_GET_RESOLUCION_CONCLUSION,
  ASYNC_SAVE_RESOLUCION_CONCLUSION,
  ASYNC_UPDATE_RESOLUCION_CONCLUSION
};

// =======================================
// REDUCER
// =======================================
/**
 * @param {defaultState} container
 */
export const ContainerResolucionConclusionReducer = (container, action) => {
  switch (action.type) {
    case "RESET":
      return defaultState;

    case "SHOW_LOADING":
      return update(container, {
        loading: { $set: true }
      });

    case "HIDE_LOADING":
      return update(container, {
        loading: { $set: false }
      });

    case "SET_FORM":
      return update(container, {
        form: { $set: action.payload.form }
      });

    case "SET_INPUT":
      return update(container, {
        form: {
          [action.payload.prop]: { $set: action.payload.value }
        }
      });

    case "SET_INVESTIGADOS":
      return update(container, {
        investigados: { $set: action.payload.investigados }
      });

    case "SET_ERRORS":
      return update(container, {
        errors: { $set: action.payload.errors }
      });

    case "SET_FORM_TYPE":
      return update(container, {
        formType: { $set: action.payload.formType }
      });

    case "SET_DEFAULT_ORGANOS":
      const { etapas } = action.payload;
      return update(container, {
        form: {
          $apply: f => ({
            ...f,
            idOrganoSancionador: etapas.idOrganoSancionadorInformeOi || "",
            descOrganoSancionador: etapas.descOrganoSancionadorInformeOi || "",
            idCargoOrganoSancionador:
              etapas.idCargoOrganoSancionadorInformeOi || "",
            descCargoOrganoSancionador:
              etapas.descCargoOrganoSancionadorInformeOi || ""
            // idOrganoSancionador: etapas.idOrganoSancionador || "",
            // descOrganoSancionador: etapas.descOrganoSancionador || "",
            // idCargoOrganoSancionador:
            //   etapas.idCargoOrganoSancionador || "",
            // descCargoOrganoSancionador:
            //   etapas.descCargoOrganoSancionador || ""
          })
        }
      });

    case "FETCH_TIPO_SANCION_BEGIN":
      return update(container, {
        comboLists: {
          tipoSancion: {
            loading: { $set: true }
          }
        }
      });

    case "FETCH_TIPO_SANCION_SUCCESS":
      return update(container, {
        comboLists: {
          tipoSancion: {
            $set: { loading: false, value: action.payload.list }
          }
        }
      });

    case "OPEN_MODAL_NOTIFICACION":
      return update(container, {
        modalNotificacion: {
          $set: {
            open: true
          }
        }
      });

    case "CLOSE_MODAL_NOTIFICACION":
      return update(container, {
        modalNotificacion: {
          $set: {
            open: false
          }
        }
      });

    default:
      return container;
  }
};
