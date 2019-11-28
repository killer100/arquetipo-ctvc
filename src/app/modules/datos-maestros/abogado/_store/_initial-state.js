import { FORM_TYPE } from 'app/core/enums/enums'

export const buildFormBuscarAbogado = () => ({
  dniAbogado: '',
  nombres: '',
  primerApellido: '',
  segundoApellido: ''
});

export const buildAbogado = () => ({
  idAbogado: null,
  dniAbogado: '',
  nombres: '',
  primerApellido: '',
  segundoApellido: ''
})

export const buildModalAbogado = () => ({
  open: false,
  title: 'Registrar Abogado',
  formType: FORM_TYPE.REGISTRAR,
  idAbogado: null,
  abogado: buildAbogado(),
  loading: false,
	errors: null
})

export const buscadorAbogados = {
  loading: false,

  filters: buildFormBuscarAbogado(),

  tableDef: {
    columns: [
      { label: 'N° DNI', property: 'dniAbogado' },
      { label: 'Nombres', property: 'nombres' },
      { label: 'Primer Apellido', property: 'primerApellido' },
      { label: 'Segundo Apellido', property: 'segundoApellido' },
      { label: 'Fecha de registro', property: 'fechaRegistro', isDate: true }
    ]
  },

  pagination: {
    total: 0,
    page: 1,
    pageSize: 10,
    items: []
  }
}

export const modalGestionAbogado = buildModalAbogado();

export const intialState = {
  buscadorAbogados,
  modalGestionAbogado
}
