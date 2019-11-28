import {
	FORM_TYPE
} from "app/core/enums/enums";
import {
	buildModalDestinoNotificacion
} from "../_initial-state";
import {
	GetDestinoNotificacion,
	SaveDestinoNotificacion,
	UpdateDestinoNotificacion,
	DeleteAnexo,
	SaveAnexo
} from "../../api/destino-notificacion.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalDestinoNotificacionActions {
	/**
	 * @param {() => import('../_initial-state').modalDestinoNotificacion} getState
	 * @param {(state:import('../_initial-state').modalDestinoNotificacion ) => void} setState
	 */
	constructor(getState, setState) {
		this.getState = getState;
		this.setState = setState;
	}

	openModalNew = (autoridadCompetente) => {
		this.setState({
			...this.getState(),
			open: true,
			formType: FORM_TYPE.REGISTRAR,
			autoridadCompetente
		});
	};

	openModalUpdate = (autoridadCompetente, idDestinoNotificacion) => {
		this.setState({
			...this.getState(),
			open: true,
			idDestinoNotificacion,
			formType: FORM_TYPE.EDITAR,
			autoridadCompetente
		});
	};

	closeModal = () => {
		this.setState({
			...this.getState(),
			open: false
		});
	};

	resetModal = () => {
		this.setState(buildModalDestinoNotificacion());
	};

	//=============================================
	// Obtener Destino Notificacion
	//=============================================

	getDestinoNotificacionBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	getDestinoNotificacionSuccess = (destinoNotificacion) => {
		this.setState({
			...this.getState(),
			loading: false,
			destinoNotificacion
		});
	};

	getDestinoNotificacionError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncGetDestinoNotificacion = (idDestinoNotificacion) => {
		this.getDestinoNotificacionBegin();
		return GetDestinoNotificacion(idDestinoNotificacion).then(response => {
			if (!response.data.destinoNotificacion.anexos) {
				response.data.destinoNotificacion.anexos = [];
			}
			this.getDestinoNotificacionSuccess(response.data.destinoNotificacion);
			return response;
		}).catch(err => {
			this.getDestinoNotificacionError();
			return err;
		});
	}

	//=============================================
	// Guardar Destino Notificacion
	//=============================================

	saveDestinoNotificacionBegin = () => {
		this.setState({
			...this.getState(),
			loading: true,
			errors: null
		});
	};

	saveDestinoNotificacionSuccess = (idDestinoNotificacion) => {
		this.setState({
			...this.getState(),
			loading: false,
			idDestinoNotificacion,
            formType: FORM_TYPE.EDITAR,
            open: false
		});
	};

	saveDestinoNotificacionError = errors => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncSaveDestinoNotificacion = (idExpedienteInvestigacion, destinoNotificacion) => {console.log(idExpedienteInvestigacion);
		this.saveDestinoNotificacionBegin();
		return SaveDestinoNotificacion({
				...destinoNotificacion,
				idExpedienteInvestigacion
			})
			.then(resp => {
				this.saveDestinoNotificacionSuccess(resp.data.id);
				return resp.data.id;
			})
			.catch(err => {
				const errors = err.data && err.data.errors ? err.data.errors : null;
				this.saveDestinoNotificacionError(errors);
				throw err;
			});
	};

	//=========================================
	// Actualizar Destino Notificacion
	//=========================================

	updateDestinoNotificacionBegin = () => {
		this.setState({
			...this.getState(),
			loading: false,
			errors: null
		});
	};

	updateDestinoNotificacionSuccess = () => {
		this.setState({
			...this.getState(),
            loading: false,
            open:false
		});
	};

	updateDestinoNotificacionError = errors => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncUpdateDestinoNotificacion = (
		idDestinoNotificacion,
		destinoNotificacion
	) => {
		this.updateDestinoNotificacionBegin();
		return UpdateDestinoNotificacion(
				idDestinoNotificacion,
				destinoNotificacion
			)
			.then(resp => {
				this.updateDestinoNotificacionSuccess();
				return null;
			})
			.catch(err => {
				const errors = err.data && err.data.errors ? err.data.errors : null;
				this.updateDestinoNotificacionError(errors);
			});
	};

	//=============================================
	// Eliminar Anexos
	//=============================================

	deleteAnexoBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	deleteAnexoSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	deleteAnexoError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncDeleteAnexo = (idDestinoNotificacion, idAnexoDestinoNotificacion) => {
		this.deleteAnexoBegin();
		return DeleteAnexo(idDestinoNotificacion, idAnexoDestinoNotificacion).then(response => {
			this.deleteAnexoSuccess();
			return response;
		}).catch(err => {
			this.deleteAnexoError();
			return err;
		});
	}

	//=============================================
	// Agregar Anexos
	//=============================================

	saveAnexoBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	saveAnexoSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	saveAnexoError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncSaveAnexo = (idDestinoNotificacion, anexo) => {
		this.saveAnexoBegin();
		return SaveAnexo(idDestinoNotificacion, anexo).then(response => {
			this.saveAnexoSuccess();
			return response.data.id;
		}).catch(err => {
			this.saveAnexoError();
			return err;
		});
	}



}