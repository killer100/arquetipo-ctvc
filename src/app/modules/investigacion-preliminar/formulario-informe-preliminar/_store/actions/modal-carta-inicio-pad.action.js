import {
	FORM_TYPE
} from "app/core/enums/enums";
import {
	buildModalCartaInicioPad
} from "../_initial-state";
import {
	UpdateCartaInicioPad,
	SaveCartaInicioPad,
	GetCartaInicioPad
} from "../../api/informe-preliminar.api";
import update from 'immutability-helper';
/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalCartaInicioPadActions {
	/**
	 * @param {() => import('../_initial-state').modalCartaInicioPad} getState
	 * @param {(state:import('../_initial-state').modalCartaInicioPad ) => void} setState
	 */
	constructor(getState, setState) {
		this.getState = getState;
		this.setState = setState;
	}

	openModalNew = (organoInstructor, investigados, idInformePreliminar) => {
		this.setState({
			...this.getState(),
			open: true,
			formType: FORM_TYPE.REGISTRAR,
			organoInstructor,
			investigados,
			idInformePreliminar
		});
	};

	openModalUpdate = (organoInstructor, investigados, idCartaInicioPad, idInformePreliminar) => {
		this.setState({
			...this.getState(),
			open: true,
			idCartaInicioPad,
			formType: FORM_TYPE.EDITAR,
			organoInstructor,
			investigados,
			idInformePreliminar
		});
	};

	closeModal = () => {
		this.setState({
			...this.getState(),
			open: false
		});
	};

	resetModal = () => {
		this.setState(buildModalCartaInicioPad());
	};



	setIdDestinoNotificacion = idDestinoNotificacion => {
		this.setState(update(this.getState(), {
			cartaInicioPad: {
				idDestinoNotificacion: {
					$set: idDestinoNotificacion
				}
			}
		}));
	}

	//=============================================
	// Obtener carta inicio pad
	//=============================================

	getCartaInicioPadBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	getCartaInicioPadSuccess = (cartaInicioPad) => {
		this.setState({
			...this.getState(),
			loading: false,
			cartaInicioPad
		});
	};

	getCartaInicioPadError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncGetCartaInicioPad = (idInformePreliminar, idCartaInicioPad) => {
		this.getCartaInicioPadBegin();
		return GetCartaInicioPad(idInformePreliminar, idCartaInicioPad).then(response => {
			this.getCartaInicioPadSuccess(response.data.cartaInicioPad);
			return response;
		}).catch(err => {
			this.getCartaInicioPadError();
			return err;
		});
	}

	//=============================================
	// Guardar carta inicio pad
	//=============================================

	saveCartaInicioPadBegin = () => {
		this.setState({
			...this.getState(),
			loading: true,
			errors: null
		});
	};

	saveCartaInicioPadSuccess = (idCartaInicioPad) => {
		this.setState({
			...this.getState(),
			loading: false,
			idCartaInicioPad,
			formType: FORM_TYPE.EDITAR
		});
	};

	saveCartaInicioPadError = errors => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncSaveCartaInicioPad = (idInformePreliminar, cartaInicioPad) => {
		this.saveCartaInicioPadBegin();
		return SaveCartaInicioPad(
			idInformePreliminar,
			cartaInicioPad
		).then(resp => {
			this.saveCartaInicioPadSuccess(resp.data.id);
			return resp.data.id;
		})
			.catch(err => {
				const errors = err.data && err.data.errors ? err.data.errors : null;
				this.saveCartaInicioPadError(errors);
				throw err;
			});
	};

	//=========================================
	// Actualizar carta inicio pad
	//=========================================

	updateCartaInicioPadBegin = () => {
		this.setState({
			...this.getState(),
			loading: false,
			errors: null
		});
	};

	updateCartaInicioPadSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	updateCartaInicioPadError = errors => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncUpdateCartaInicioPad = (
		idInformePreliminar,
		idCartaInicioPad,
		cartaInicioPad
	) => {
		this.updateCartaInicioPadBegin();
		return UpdateCartaInicioPad(
			idInformePreliminar,
			idCartaInicioPad,
			cartaInicioPad
		)
			.then(resp => {
				this.updateCartaInicioPadSuccess();
				return null;
			})
			.catch(err => {
				const errors = err.data && err.data.errors ? err.data.errors : null;
				this.updateCartaInicioPadError(errors);
			});
	};



}