import {
	FORM_TYPE
} from "app/core/enums/enums";

//===============================
// MODAL GESTION ARTICULO
//===============================
/**
 * @type {{
 * 	idCapitulo: number,
 *  	capitulo: {
 *  	  idCapitulo: number,
 *  	  numeroCapitulo: string,
 *  	  descripcion: string
 *  	  titulo: {
 *  	    idTitulo: number,
 *  	    numeroTitulo: string,
 *  	    descripcion: string,
 *  	    norma: {
 *  	      idNorma: number,
 *  	      numeroNorma: string,
 *  	      descripcion: string
 *  	    }
 *  	  }
 *  	}
 * }}
 */
export const capituloData = {
	idCapitulo: null,
	capitulo: null
};

//===============================
// MODAL GESTION ARTICULO
//===============================

/**
 * @typedef {{
 *   idArticulo: number;
 *   numeroArticulo: string;
 *   descripcion: string;
 * }} IArticulo
 */

export const buildArticulo = () => ({
	idCapitulo: null,
	idArticulo: null,
	numeroArticulo: "",
	descripcion: ""
});

export const buildModalGestionArticulo = () => ({
	open: false,
	loading: false,
	title: "Registro del Artículo de la Norma Legal",
	idArticulo: null,
	formType: FORM_TYPE.REGISTRAR,
	/**
	 * @type IArticulo
	 */
	articulo: buildArticulo(),
	errors: null
});

export const modalGestionArticulo = buildModalGestionArticulo();

//===============================
// FORMULARIO BUSCAR ARTICULO
//===============================

export const buildFormBuscarArticulo = () => ({
	numeroArticulo: "",
	descripcion: ""
});

export const buscadorArticulo = {
	loading: false,
	pagination: {
		page: 1,
		pageSize: 10,
		total: 0,
		items: []
	},

	filters: buildFormBuscarArticulo(),

	gridDefinition: {
		columns: [{
				label: "Nro. del Artículo",
				property: "numeroArticulo"
			},
			{
				label: "Descripción del Artículo",
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
	buscadorArticulo,
	modalGestionArticulo,
	capituloData
};