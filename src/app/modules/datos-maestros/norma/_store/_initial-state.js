import {
	FORM_TYPE
} from "app/core/enums/enums";

//===============================
// MODAL GESTION NORMA
//===============================

/**
 * @typedef {{
 * 	 idNorma: number;
 *   numeroNorma: string;
 *   descripcion: string;
 * }} INorma
 */

export const buildNorma = () => ({
	idNorma: null,
	numeroNorma: "",
	descripcion: ""
});

export const buildModalGestionNorma = () => ({
	open: false,
	loading: false,
	title: "Registro de Normas y Reglamentos Legales",
	idNorma: null,
	formType: FORM_TYPE.REGISTRAR,
	/**
	 * @type INorma
	 */
	norma: buildNorma(),
	errors: null
});

export const modalGestionNorma = buildModalGestionNorma();

//===============================
// FORMULARIO BUSCAR NORMA
//===============================

export const buildFormBuscarNorma = () => ({
	numeroNorma: "",
	descripcion: ""
});

export const buscadorNorma = {
	loading: false,
	pagination: {
		page: 1,
		pageSize: 10,
		total: 0,
		items: []
	},

	filters: buildFormBuscarNorma(),

	gridDefinition: {
		columns: [{
				label: "Nro. Norma",
				property: "numeroNorma"
			},
			{
				label: "Descripción de la Norma",
				property: "descripcion"
			},
			{
				label: "Fecha de Registro",
				property: "fechaRegistro",
				isDate: true
			}
		]
	}
};

//===============================
// INITIAL STATE
//===============================

export const initialState = {
	buscadorNorma,
	modalGestionNorma
};