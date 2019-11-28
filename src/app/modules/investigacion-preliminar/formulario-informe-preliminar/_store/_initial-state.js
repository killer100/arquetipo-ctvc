import { FORM_TYPE } from "app/core/enums/enums";

/**
 * @typedef {{
 *    idInformePreliminar: any,
 *    idExpedienteInvestigacion: number,
 *    idEstadoInformePreliminar: any,
 *    idOrganoInstructor: boolean,
 *    descOrganoInstructor: number,
 *    idCargoOrganoInstructor: boolean,
 *    descCargoOrganoInstructor: number,
 *    numeroInforme: number,
 *    fechaInforme: boolean,
 *    descripcionArchivo: string,
 *    nombreArchivo: string,
 *    observacion: string,
 *    cartaInicioPad: any,
 *    faltas: any[]
 * }} IFormInformePreliminar
 *
 * @typedef {{
 *    idCartaInicioPad: number,
 *    idTipoSancion: number,
 *    idInformePreliminar: number,
 *    numeroCarta: string,
 *    fechaCarta: any,
 *    descripcionArchivo: string,
 *    nombreArchivo: string,
 *    idOrganoSancionador: string,
 *    descOrganoSancionador: string,
 *    idCargoOrganoSancionador: string,
 *    descCargoOrganoSancionador: string,
 *    idExpedienteInvestigacion: number,
 *    idDestinoNotificacion: number
 * }} IFormCartaInicioPad
 *
 * @typedef {{
 *    idDestinoNotificacion: number,
 *    idExpedienteInvestigacion: number,
 *    idEstadoExpediente: number,
 *    idRegion: string,
 *    descripcionRegion: string,
 *    idProvincia: string,
 *    descripcionProvincia: string,
 *    idDistrito: string,
 *    descripcionDistrito: string,
 *    direccion: string,
 *    folio: string,
 *    anexos: any[]
 * }} IDestinoNotificacion
 *
 * @typedef {{
 *     numeroCarta: string,
 *     fechaCarta: string,
 *     numeroDias: number,
 *     observacion: string,
 *     descArchivoSolicAmplicacion: string,
 *     nomArchivoSolicAmplicacion: string,
 *     descArchivoRespAmpliaPlazo: string,
 *     nomArchivoRespAmpliaPlazo: string
 * }} IFormEIAmpliacionPlazo
 *
 * @typedef {{
 *      numeroCarta: string,
 *      fechaCarta: any,
 *      observacion: string,
 *      descArchivoRespInfoOral: string,
 *      nomArchivoRespInfoOral: string
 * }} IFormEIProgramacionIO
 *
 * @typedef {{
 * 	loading: boolean,
 *  errors: {
 *  	ampliacionPlazo: any,
 *		programacionInformeOral: any
 *  }
 * 	form: {
 *    	ampliacionPlazo: IFormEIAmpliacionPlazo,
 *    	programaInformeOral: IFormEIProgramacionIO,
 *    	archivosDocumentosDescargo: [],
 *    	archivosActaInformeOral: []
 * 	}
 * }} IFormEtapaInstructuva
 * @typedef {{
 *    id: number,
 *    idInformeOrganoInstructivo: number,
 *    idResolucionConclusion: number
 *    idDestinoNotificacion: number
 * }} IEtapa
 */

export const buildDestinoNotificacion = () => ({
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
});

export const buildModalDestinoNotificacion = () => ({
  loading: false,
  formType: FORM_TYPE.REGISTRAR,
  open: false,
  errors: null,
  idDestinoNotificacion: null,
  title: "Registro del Dato de Notificación",
  destinoNotificacion: buildDestinoNotificacion(),
  autoridadCompetente: {
    descripcion: ""
  }
});

export const modalDestinoNotificacion = buildModalDestinoNotificacion();

export const buildCartaInicioPad = () => ({
  idCartaInicioPad: null,
  idTipoSancion: null,
  idInformePreliminar: null,
  numeroCarta: "",
  fechaCarta: null,
  descripcionArchivo: "",
  nombreArchivo: "",
  idOrganoSancionador: "",
  descOrganoSancionador: "",
  idCargoOrganoSancionador: "",
  descCargoOrganoSancionador: "",
  idExpedienteInvestigacion: null,
  idDestinoNotificacion: null
});

export const buildModalCartaInicioPad = () => ({
  loading: false,
  formType: FORM_TYPE.REGISTRAR,
  open: false,
  cartaInicioPad: buildCartaInicioPad(),
  errors: null,
  idExpedienteInvestigacion: null,
  idInformePreliminar: null,
  title: "Registro de Inicio del PAD",
  idCartaInicioPad: null,
  organoInstructor: {},
  investigados: ""
});

export const modalCartaInicioPad = buildModalCartaInicioPad();

export const buildInformePreliminar = () => ({
  idInformePreliminar: null,
  idExpedienteInvestigacion: null,
  idEstadoInformePreliminar: null,
  idOrganoInstructor: "",
  descOrganoInstructor: "",
  idCargoOrganoInstructor: "",
  descCargoOrganoInstructor: "",
  numeroInforme: "",
  fechaInforme: null,
  descripcionArchivo: "",
  nombreArchivo: "",
  observacion: "",
  cartaInicioPad: null,
  faltas: [],
  idCartaInicioPad: null
});

export const buildContainerInformePreliminar = () => ({
  loading: false,
  idInformePreliminar: null,
  informePreliminar: buildInformePreliminar(),
  errors: null,
  formType: FORM_TYPE.REGISTRAR,
  openModalBuscarFalta: false
});

export const containerInformePreliminar = buildContainerInformePreliminar();

export const buildContainerEtapas = () => ({
  loading: false,
  error: null,
  /**
   * @type {{
   *  idTipoSancion: number,
   *  idOrganoInstructor: number,
   *  descOrganoInstructor: string,
   *  idCargoOrganoInstructor: number,
   *  descCargoOrganoInstructor: string,
   *  idOrganoSancionador: number,
   *  descOrganoSancionador: string,
   *  idCargoOrganoSancionador: number,
   *  descCargoOrganoSancionador: string,
   *  idOrganoSancionadorInformeOi: number,
   *  descOrganoSancionadorInformeOi: string,
   *  idCargoOrganoSancionadorInformeOi: number,
   *  descCargoOrganoSancionadorInformeOi: string,
   *  esConcluido: bool,
   *  numeroExpediente: string,
   *  etapa1:IEtapa,
   *  etapa2:IEtapa,
   *  etapa3:IEtapa,
   * }}
   */
  etapas: null,
  // etapas: {
  //   etapa1: { id: null },
  //   etapa2: { id: null },
  //   etapa3: { id: null }
  // },
  activeStep: 0
});

export const containerEtapas = buildContainerEtapas();

export const buildFormEtapaInstructiva = () => ({
  loading: false,
  errors: {
    ampliacionPlazo: { errors: null },
    programacionInformeOral: { errors: null }
  },
  form: {
    ampliacionPlazo: {
      numeroCarta: "",
      fechaCarta: null,
      numeroDias: "",
      observacion: "",
      descArchivoSolicAmpliacion: "",
      nomArchivoSolicAmpliacion: "",
      descArchivoRespAmpliaPlazo: "",
      nomArchivoRespAmpliaPlazo: ""
    },
    programaInformeOral: {
      numeroCarta: "",
      fechaCarta: null,
      observacion: "",
      descArchivoRespInfoOral: "",
      nomArchivoRespInfoOral: ""
    },
    archivosDocumentosDescargo: [],
    archivosActaInformeOral: []
  }
});

export const initialState = {
  modalDestinoNotificacion,
  containerInformePreliminar,
  modalCartaInicioPad,
  modalDestinoNotificacion,
  containerEtapas
};
