import {
	FORM_TYPE
} from "app/core/enums/enums";

/**
 * @typedef {{
 *    [prop:string]: {value: any[], loading: boolean}
 * }} IFilterList
 *
 * @typedef {{
 *    fechaRecepcion: any,
 *    tiempoPrescripcion: number,
 *    fechaPrescripcion: any,
 *    expedienteCorrupcion: boolean,
 *    idAbogado: number,
 *    amonestacionVerbal: boolean,
 *    idTrabajadorDenunciante: number,
 *    idDependenciaDenunciante: number,
 *    esDenuncianteExterno: boolean,
 *    externoDenunciante: string,
 *    observacion: string,
 *    dependenciaDenunciante: string,
 *    nombreDenunciante: string,
 *    expedientes: any[],
 *    investigados: any[],
 *    archivos: any[],
 *    requerimientos: any[]
 * }} IFormGestionInvestigacion
 * 
 * @typedef {{
 * 	idAnexoExpediente: number,
 *		numeroExpedienteAnexo: string ,
 *		fechaExpedienteDocumentario: any,
 *		folioExpediente: number,
 *		remitente: string,
 *		descripcion: string
 * }} IAnexoExpediente
 */

export const buildFormBuscarInvestigacion = () => ({
	idDependenciaDenunciante: null,
	idAbogado: null,
	nombreInvestigado: "",
	idEstadoExpediente: "",
	fechaInicio: null,
	fechaFin: null,
	nombreDenunciante: "",
	expedienteCorrupcion: false,
	numeroExpediente: "",
	numeroHojaTramite: ""
});

export const buscadorInvestigacion = {
	loading: false,

	/**
	 *
	 * @param {IFilterList} filterLists
	 */
	filterLists: {
		dependencias: {
			value: [],
			loading: false
		},
		abogados: {
			value: [],
			loading: false
		},
		estados: {
			value: [],
			loading: false
		}
	},

	filters: buildFormBuscarInvestigacion(),

	tableDef: {
		columns: [{
				label: "N° exp",
				property: "numeroExpediente"
			},
			{
				label: "N° Hoja ruta",
                property: "numeroHojaRuta"
			},
			{
				label: "Fecha hoja ruta",
                property: "fechaHojaRuta",
                isDate: true
			},
			{
				label: "Recepción UGTH",
                property: "fechaRecepcion",
                isDate: true
			},
			{
				label: "Prescr. Investig.",
                property: "fechaPrescripcion",
                isDate: true
			},
			{
				label: "Denunciante",
				property: "denunciante"
			},
			{
				label: "Dependencia denunciante",
				property: "dependenciaDenunciante"
			},
			{
				label: "Abog. Responsable",
				property: "abogadoResponsable"
			},
			{
				label: "Estado Exp.",
				property: "estadoExpediente"
			}
		]
	},

	pagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		items: []
	}
};

export const buildExpedienteInvestigacion = () => ({
	fechaRecepcion: null,
	tiempoPrescripcion: 0,
	fechaPrescripcion: null,
	expedienteCorrupcion: false,
	idAbogado: null,
	amonestacionVerbal: false,
	idTrabajadorDenunciante: null,
	idDependenciaDenunciante: null,
	esDenuncianteExterno: false,
	externoDenunciante: "",
	observacion: "",
	dependenciaDenunciante: "",
	nombreDenunciante: "",
	expedientes: [],
	investigados: [],
	archivos: [],
	requerimientos: []
});

export const buildModalGestionInvestigacion = () => ({
	open: false,
	title: "Registro del Expediente de Denuncia",
	formType: FORM_TYPE.REGISTRAR,
	idExpedienteInvestigacion: null,
	expedienteInvestigacion: buildExpedienteInvestigacion(),
	loading: false,
	errors: null,
	gridArchivoDef: {},
	gridInvestigadoDef: {},
	filterLists: {
		tiempoPrescripcion: {
			loading: false,
			value: [{
				label: '1',
				value: 1
			}, {
				label: '3',
				value: 3
			}]
		},
		abogado: {
			loading: false,
			value: []
		},
		trabajador: {
			loading: false,
			value: []
		}
	}
});

export const modalGestionInvestigacion = buildModalGestionInvestigacion();

export const buildAnexoExpediente = () => ({
	idAnexoExpediente: null,
	numeroExpedienteAnexo: "",
	fechaExpedienteDocumentario: null,
	folioExpediente: 0,
	remitente: "",
	descripcion: ""
});

export const buildModalFormAnexoExpediente = () => ({
	open: false,
	title: "Agregar Expediente de Hoja de Trámite",
	idAnexoExpediente: null,
	expediente: buildAnexoExpediente(),
	formType: FORM_TYPE.REGISTRAR,
	loading: false,
	errors: null,
	rowIndex: null
});

export const modalFormAnexoExpediente = buildModalFormAnexoExpediente();

export const buildInvestigado = () => ({
	idInvestigado: null,
	dniInvestigado: "",
	nombres: "",
	primerApellido: "",
	segundoApellido: "",
	idDependencia: null,
	descDependencia: null,
	idCargo: null,
	descCargo: null
});

export const buildModalFormInvestigado = () => ({
	open: false,
	title: "Agregar Investigado",
	idInvestigado: null,
	investigado: buildInvestigado(),
	formType: FORM_TYPE.REGISTRAR,
	loading: false,
	errors: null,
	rowIndex: null
});

export const modalFormInvestigado = buildModalFormInvestigado();

export const modalFormArchivo = {
	isLoading: false,
	open: false,
	tipoArchivo: {
		id: null,
		descripcion: "",
		icon: null
	}
};

export const modalFormRequerimiento = {
	isLoading: false,
	open: false
};

export const initialState = {
	buscadorInvestigacion,
	modalGestionInvestigacion,
	modalFormAnexoExpediente,
	modalFormInvestigado,
	modalFormArchivo,
	modalFormRequerimiento
};