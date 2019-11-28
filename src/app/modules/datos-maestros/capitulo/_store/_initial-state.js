import { FORM_TYPE } from "app/core/enums/enums";

//===============================
// MODAL GESTION TITULO
//===============================
/**
 * @type {{
 *  idTitulo: number,
 *  titulo: {
 *    idTitulo: number,
 *    numeroTitulo: string,
 *    descripcion: string,
 *    norma: {
 *      idNorma: number,
 *      numeroNorma: string,
 *      descripcion: string
 *    }
 *  }
 * }}
 */
export const tituloData = {
  idTitulo: null,
  titulo: null
};

//===============================
// MODAL GESTION CAPITULO
//===============================

/**
 * @typedef {{
 * 	 idCapitulo: number;
 *   numeroCapitulo: string;
 *   descripcion: string;
 * }} ICapitulo
 */

export const buildCapitulo = () => ({
  idTitulo: null,
  idCapitulo: null,
  numeroCapitulo: "",
  descripcion: ""
});

export const buildModalGestionCapitulo = () => ({
  open: false,
  loading: false,
  title: "Registro de Capítulo de la Norma Legal",
  idCapitulo: null,
  formType: FORM_TYPE.REGISTRAR,
  /**
   * @type ICapitulo
   */
  capitulo: buildCapitulo(),
	errors: null
});

export const modalGestionCapitulo = buildModalGestionCapitulo();

//===============================
// FORMULARIO BUSCAR CAPITULO
//===============================

export const buildFormBuscarCapitulo = () => ({
  numeroCapitulo: "",
  descripcion: ""
});

export const buscadorCapitulo = {
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    items: []
  },

  filters: buildFormBuscarCapitulo(),

  gridDefinition: {
    columns: [
      { label: "Nro. del Capítulo", property: "numeroCapitulo" },
      {
        label: "Descripción del Capítulo",
        property: "descripcion"
      },
      { label: "Fecha de Registro", property: "fechaRegistro", isDate: true }
    ]
  }
};

//===============================
// INITIAL STATE
//===============================

export const initialState = {
  buscadorCapitulo,
  modalGestionCapitulo,
  tituloData
};
