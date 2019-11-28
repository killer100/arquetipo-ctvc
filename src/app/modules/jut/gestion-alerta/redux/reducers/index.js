import combineReducers from "app/core/helpers/combine-reducers";
import {
	gridGestionAlertaReducer,
	gridGestionAlertaState
} from './grid-gestion-alerta.reducer';

import {
	uiGestionAlertaReducer,
	uiGestionAlertaState
} from './ui-gestion-alerta.reducer';

export const reducer = combineReducers({
	gridGestionAlerta: gridGestionAlertaReducer,
	uiGestionAlerta: uiGestionAlertaReducer
});

export const initialState = {
	gridGestionAlerta: gridGestionAlertaState,
	uiGestionAlerta: uiGestionAlertaState
};