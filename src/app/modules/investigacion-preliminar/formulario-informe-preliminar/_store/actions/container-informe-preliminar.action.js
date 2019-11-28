import {
	DeleteFalta,
	SaveFalta,
	GetInformePreliminar,
	UpdateInformePreliminar,
	SaveInformePreliminar
} from '../../api/informe-preliminar.api';
import update from 'immutability-helper';

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ContainerInformePreliminarActions {
	/**
	 * @param {() => import('../_initial-state').containerInformePreliminar} getState
	 * @param {(state:import('../_initial-state').containerInformePreliminar ) => void} setState
	 */
	constructor(getState, setState) {
		this.getState = getState;
		this.setState = setState;
	}

	openModalFalta = () => {
		this.setState({
			...this.getState(),
			openModalBuscarFalta: true
		});
	};

	closeModalFalta = () => {
		this.setState({
			...this.getState(),
			openModalBuscarFalta: false
		});
	};

	setIdInformePreliminar = (idInformePreliminar) => {
		this.setState({
			...this.getState(),
			idInformePreliminar: idInformePreliminar
		});
	}

	setIdCartaInicioPad = idCartaInicioPad => {
		this.setState(update(this.getState(), {
			informePreliminar: {
				idCartaInicioPad: {
					$set: idCartaInicioPad
				}
			}
		}));
	}

	//=============================================
	// Obtener informe preliminar
	//=============================================

	getInformePreliminarBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	getInformePreliminarSuccess = (informePreliminar) => {
		this.setState({
			...this.getState(),
			loading: false,
			informePreliminar
		});
	};

	getInformePreliminarError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncGetInformePreliminar = (idInformePreliminar, idExpedienteInvestigacion) => {
		this.getInformePreliminarBegin();
		return GetInformePreliminar(idInformePreliminar, idExpedienteInvestigacion).then(response => {
			if (!response.data.informePreliminar.faltas) {
				response.data.informePreliminar.faltas = [];
			}
			this.getInformePreliminarSuccess(response.data.informePreliminar);
			return response;
		}).catch(err => {
			this.getInformePreliminarError();
			return err;
		});
	}

	//=============================================
	// Guardar informe preliminar
	//=============================================

	saveInformePreliminarBegin = () => {
		this.setState({
			...this.getState(),
			loading: true,
			errors: null
		});
	};

	saveInformePreliminarSuccess = (id, informePreliminar) => {
		this.setState({
			...this.getState(),
			loading: false,
			informePreliminar,
			idInformePreliminar: id
		});
	};

	saveInformePreliminarError = errors => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncSaveInformePreliminar = (idExpedienteInvestigacion, informePreliminar) => {
		this.saveInformePreliminarBegin();
		return SaveInformePreliminar({
			...informePreliminar,
			idExpedienteInvestigacion
		})
			.then(resp => {
				this.saveInformePreliminarSuccess(resp.data.id, informePreliminar);
				return resp.data.id;
			})
			.catch(err => {
				const errors = err.data && err.data.errors ? err.data.errors : null;
				this.saveInformePreliminarError(errors);
				throw err;
			});
	};

	//=========================================
	// Actualizar informe preliminar
	//=========================================

	updateInformePreliminarBegin = () => {
		this.setState({
			...this.getState(),
			loading: false,
			errors: null
		});
	};

	updateInformePreliminarSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	updateInformePreliminarError = errors => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncUpdateInformePreliminar = (
		idInformePreliminar,
		informePreliminar
	) => {
		this.updateInformePreliminarBegin();
		return UpdateInformePreliminar(
			idInformePreliminar,
			informePreliminar
		)
			.then(resp => {
				this.updateInformePreliminarSuccess();
				return null;
			})
			.catch(err => {
				const errors = err.data && err.data.errors ? err.data.errors : null;
				this.updateInformePreliminarError(errors);
			});
	};

	//=============================================
	// Eliminar Faltas
	//=============================================

	deleteFaltaBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	deleteFaltaSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	deleteFaltaError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncDeleteFalta = (idInformePreliminar, idFaltaTipificada) => {
		this.deleteFaltaBegin();
		return DeleteFalta(idInformePreliminar, idFaltaTipificada).then(response => {
			this.deleteFaltaSuccess();
			return response;
		}).catch(err => {
			this.deleteFaltaError();
			return err;
		});
	}

	//=============================================
	// Agregar Faltas
	//=============================================

	saveFaltaBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	saveFaltaSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	saveFaltaError = () => {
		this.setState({
			...this.getState(),
			loading: false
		});
	};

	asyncSaveFalta = (idInformePreliminar, falta) => {
		this.saveFaltaBegin();
		return SaveFalta(idInformePreliminar, falta).then(response => {
			this.saveFaltaSuccess();
			return response;
		}).catch(err => {
			this.saveFaltaError();
			return err;
		});
	}

}