import {
	buildDestinoNotificacion
} from "../../../_store/_initial-state";
import update from "immutability-helper";

export const ACTION_RESET = () => ({
	type: "RESET"
});

export const CHANGE_INPUT = (prop, value) => ({
	type: "CHANGE-INPUT",
	payload: {
		prop,
		value
	}
});

export const PUSH_ANEXO = anexo => ({
	type: "PUSH-ANEXO",
	payload: {
		anexo
	}
});

export const SET_FORM = form => ({
	type: "SET-FORM",
	payload: {
		form
	}
});

export const DELETE_ANEXO = rowIndex => ({
	type: "DELETE-ANEXO",
	payload: {
		rowIndex
	}
});

/**
 * @param {import("../../../_store/_initial-state").IDestinoNotificacion} form
 */
export const FormDestinoNotificacionReducer = (form, action) => {
	switch (action.type) {
		case "RESET":
			return buildDestinoNotificacion();
		case "CHANGE-INPUT":
			return {
				...form, [action.payload.prop]: action.payload.value
			};
		case "PUSH-ANEXO":
			return update(form, {
				anexos: {
					$push: [action.payload.anexo]
				}
			});
		case "SET-FORM":
			return action.payload.form;
		case "DELETE-ANEXO":
			return update(form, {
				anexos: {
					$splice: [
						[action.payload.rowIndex, 1]
					]
				}
			});
	}
};