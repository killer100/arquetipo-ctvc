import {
	FORM_TYPE
} from "app/core/enums/enums";

/**
 * @type {{
 * 	idArticulo: number,
 * 	articulo: {
 * 		idArticulo: number,
 * 		numeroArticulo: string,
 * 		descripcion: string,
 *  		capitulo: {
 *  		  idCapitulo: number,
 *  		  numeroCapitulo: string,
 *  		  descripcion: string
 *  		  titulo: {
 *  		    idTitulo: number,
 *  		    numeroTitulo: string,
 *  		    descripcion: string,
 *  		    norma: {
 *  		      idNorma: number,
 *  		      numeroNorma: string,
 *  		      descripcion: string
 *  		    }
 *  		  }
 *  		}
 * 	}
 * }}
 */
export const articuloData = {
	idArticulo: null,
	articulo: null
};

//===============================
// MODAL GESTION FALTA
//===============================

/**
 * @typedef {{
 *   idFalta: number;
 *   numeroFalta: string;
 *   descripcion: string;
 * }} IFalta
 */

export const buildFalta = () => ({
	idArticulo: null,
	idFalta: null,
	numeroFalta: "",
	descripcion: ""
});

export const buildModalGestionFalta = () => ({
	open: false,
	loading: false,
	title: "Registro de la Falta de la Norma Legal",
	idFalta: null,
	formType: FORM_TYPE.REGISTRAR,
	/**
	 * @type IFalta
	 */
	falta: buildFalta(),
	errors: null
});

export const modalGestionFalta = buildModalGestionFalta();

//===============================
// FORMULARIO BUSCAR FALTA
//===============================

export const buildFormBuscarFalta = () => ({
	numeroFalta: "",
	descripcion: ""
});

export const buscadorFalta = {
	loading: false,
	pagination: {
		page: 1,
		pageSize: 10,
		total: 0,
		items: []
	},

	filters: buildFormBuscarFalta(),

	gridDefinition: {
		columns: [{
				label: "Literal de la Falta",
				property: "numeroFalta"
			},
			{
				label: "Descripción de la falta",
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
	buscadorFalta,
	modalGestionFalta,
	articuloData
};