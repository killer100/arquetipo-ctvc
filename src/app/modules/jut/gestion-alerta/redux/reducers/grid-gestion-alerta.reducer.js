import * as ACTIONS from '../actions';

export const gridGestionAlertaState = {
	definition: {
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
				property: "fechaHojaRuta"
			}
		]
	},
	pagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		items: []
	},
	loading: false
};

export const gridGestionAlertaReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_PAGINATION:
			return {
				...state, pagination: action.payload.pagination
			};
		case ACTIONS.SHOW_LOADING:
			return {
				...state, loading: true
			};

		case ACTIONS.HIDE_LOADING:
			return {
				...state, loading: false
			};
		default:
			return state;
	}
};