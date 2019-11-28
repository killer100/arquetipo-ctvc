import { FORM_TYPE } from "app/core/enums/enums";

//===============================
// MODAL GESTION TITULO
//===============================

export const normaData = {
  idNorma: null,
  norma: null
};

//===============================
// MODAL GESTION TITULO
//===============================

/**
 * @typedef {{
 * 	 idTitulo: number;
 *   numeroTitulo: string;
 *   descripcion: string;
 * }} ITitulo
 */

export const buildTitulo = () => ({
  idNorma: null,
  idTitulo: null,
  numeroTitulo: "",
  descripcion: ""
});

export const buildModalGestionTitulo = () => ({
  open: false,
  loading: false,
  title: "Registro de Título de la Norma Legal",
  idTitulo: null,
  formType: FORM_TYPE.REGISTRAR,
  /**
   * @type ITitulo
   */
  titulo: buildTitulo(),
	errors: null
});

export const modalGestionTitulo = buildModalGestionTitulo();

//===============================
// FORMULARIO BUSCAR TITULO
//===============================

export const buildFormBuscarTitulo = () => ({
  numeroTitulo: "",
  descripcion: ""
});

export const buscadorTitulo = {
  idNorma: null,
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    items: []
  },

  filters: buildFormBuscarTitulo(),

  gridDefinition: {
    columns: [
      { label: "Nro. del Título", property: "numeroTitulo" },
      {
        label: "Descripción del Título",
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
  buscadorTitulo,
  modalGestionTitulo,
  normaData
};
