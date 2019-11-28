import update from "immutability-helper";
import { FORM_TYPE } from "app/core/enums/enums";
import { GetInvestigados } from "../../../api/informe-preliminar.api";
import { FetchTipoSancion } from "app/core/api/maestros.api";
import {
  SaveInformeOrganoInstructor,
  GetInformeOrganoInstructor,
  UpdateInformeOrganoInstructor
} from "../../../api/informe-organo-instructor.api";
// =======================================
// INITIAL STATE
// =======================================
export const defaultModal = {
  title: "Registro del Informe del Órgano Instructivo",
  loading: false,
  investigados: "",
  formType: FORM_TYPE.REGISTRAR,
  form: {
    idInformeOrganoInstructor: null,
    numeroInforme: "",
    fechaInforme: null,
    descArchivoInforme: "",
    nomArchivoInforme: "",
    idOrganoInstructor: "",
    descOrganoInstructor: "",
    idCargoOrganoInstructor: "",
    descCargoOrganoInstructor: "",
    idOrganoSancionador: "",
    descOrganoSancionador: "",
    idCargoOrganoSancionador: "",
    descCargoOrganoSancionador: "",
    esArchivado: false,
    diasSuspension: ""
  },
  errors: {},
  comboLists: {
    tipoSancion: {
      value: [],
      loading: false
    }
  }
};

// =======================================
// ACTIONS
// =======================================

const RESET = () => ({ type: "RESET" });
const SHOW_LOADING = () => ({ type: "SHOW_LOADING" });
const HIDE_LOADING = () => ({ type: "HIDE_LOADING" });
const SET_TITLE = title => ({ type: "SET_TITLE", payload: { title } });
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

///

const ASYNC_GET_INFORME_ORGANO_INSTRUCTOR = dispatch => idInformeOrganoInstructor => {
  dispatch(SHOW_LOADING());
  return GetInformeOrganoInstructor(idInformeOrganoInstructor).then(resp => {
    dispatch(HIDE_LOADING());
    dispatch(SET_FORM(resp.data.informeOrganoInstructor));
  });
};

const ASYNC_SAVE_INFORME_ORGANO_INSTRUCTOR = dispatch => informeOrganoInstructor => {
  dispatch(SHOW_LOADING());
  return SaveInformeOrganoInstructor(informeOrganoInstructor)
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

const ASYNC_UPDATE_INFORME_ORGANO_INSTRUCTOR = dispatch => (
  idInformeOrganoInstructor,
  informeOrganoInstructor
) => {
  dispatch(SHOW_LOADING());
  return UpdateInformeOrganoInstructor(
    idInformeOrganoInstructor,
    informeOrganoInstructor
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
  SET_TITLE,
  SET_FORM,
  SET_INPUT,
  SET_INVESTIGADOS,
  SET_FORM_TYPE,
  SET_ERRORS,
  SET_DEFAULT_ORGANOS,
  ASYNC_GET_INVESTIGADOS,
  ASYNC_FETCH_TIPOS_SANCION,
  ASYNC_GET_INFORME_ORGANO_INSTRUCTOR,
  ASYNC_SAVE_INFORME_ORGANO_INSTRUCTOR,
  ASYNC_UPDATE_INFORME_ORGANO_INSTRUCTOR
};

// =======================================
// REDUCER
// =======================================
/**
 * @param {defaultModal} modal
 */
export const ModalInformeOrganoInstructorReducer = (modal, action) => {
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

    case "SET_FORM":
      return update(modal, {
        form: { $set: action.payload.form }
      });

    case "SET_INPUT":
      return update(modal, {
        form: {
          [action.payload.prop]: { $set: action.payload.value }
        }
      });

    case "SET_INVESTIGADOS":
      return update(modal, {
        investigados: { $set: action.payload.investigados }
      });

    case "SET_ERRORS":
      return update(modal, {
        errors: { $set: action.payload.errors }
      });

    case "SET_FORM_TYPE":
      return update(modal, {
        formType: { $set: action.payload.formType }
      });

    case "SET_DEFAULT_ORGANOS":
      const { etapas } = action.payload;
      return update(modal, {
        form: {
          $apply: f => ({
            ...f,
            idOrganoInstructor: etapas.idOrganoInstructor,
            descOrganoInstructor: etapas.descOrganoInstructor,
            idCargoOrganoInstructor: etapas.idCargoOrganoInstructor,
            descCargoOrganoInstructor: etapas.descCargoOrganoInstructor,
            idOrganoSancionador: etapas.idOrganoSancionador,
            descOrganoSancionador: etapas.descOrganoSancionador,
            idCargoOrganoSancionador: etapas.idCargoOrganoSancionador,
            descCargoOrganoSancionador: etapas.descCargoOrganoSancionador
          })
        }
      });

    case "FETCH_TIPO_SANCION_BEGIN":
      return update(modal, {
        comboLists: {
          tipoSancion: {
            loading: { $set: true }
          }
        }
      });

    case "FETCH_TIPO_SANCION_SUCCESS":
      return update(modal, {
        comboLists: {
          tipoSancion: {
            $set: { loading: false, value: action.payload.list }
          }
        }
      });

    default:
      return modal;
  }
};
