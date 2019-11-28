import update from "immutability-helper";
import {
	buildModalGestionNorma
} from "../_initial-state";
import {
	FORM_TYPE
} from "app/core/enums/enums";
import {
	GetNorma,
	SaveNorma,
	UpdateNorma
} from "../../api/norma.api";

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionNormaActions {
	/**
	 * @param {() => import('../_initial-state').modalGestionNorma} getState
	 * @param {(state:import('../_initial-state').modalGestionNorma ) => void} setState
	 */
	constructor(getState, setState) {
		this.getState = getState;
		this.setState = setState;
	}

	openModalNew = () => {
		this.setState({
			...this.getState(),
			open: true
		});
	};

	openModalShow = idNorma => {
		this.setState({
			...this.getState(),
			open: true,
			idNorma,
			formType: FORM_TYPE.CONSULTAR,
			title: "Ver Norma / Reglamento"
		});
	};

	openModalEdit = idNorma => {
		this.setState({
			...this.getState(),
			open: true,
			idNorma,
			formType: FORM_TYPE.EDITAR,
			title: "Editar Norma / Reglamento"
		});
	};

	closeModal = () => {
		this.setState({
			...this.getState(),
			open: false
		});
	};

	resetModal = () => {
		this.setState(buildModalGestionNorma());
	};

	setErrors = (errors) => {
		this.setState({
			...this.getState(),
			errors: errors
		});
	}

	setLoading = (show) => {
		this.setState({
			...this.getState(),
			loading: show
		});
	}

	//=========================================
	// GET NORMA
	//=========================================

	getNormaSuccess = norma => {
		this.setState({
			...this.getState(),
			norma: norma,
			loading: false
		});
	};

	asyncGetNorma = idNorma => {
		this.setLoading(true);
		GetNorma(idNorma).then(resp => {
			this.getNormaSuccess(resp.data.norma);
		}).catch(err => {
			this.setLoading(false);
		});
	};

	//=========================================
	// SAVE NORMA
	//=========================================	

	saveNormaBegin = () => {
		this.setState({
			...this.getState(),
			loading: false,
			errors: null
		});
	}

	saveNormaSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false,
			open: false
		});
	};

	saveNormaError = (errors) => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncSaveNorma = norma => {
		this.setLoading(true);
		return SaveNorma(norma).then(resp => {
            this.saveNormaSuccess();
            return null;
		}).catch(err => {
			const errors = err.data && err.data.errors ? err.data.errors : null;
			this.saveNormaError(errors);
		});
	};

	//=========================================
	// UPDATE NORMA
	//=========================================	

	updateNormaBegin = () => {
		this.setState({
			...this.getState(),
			loading: false,
			errors: null
		});
	}

	updateNormaSuccess = () => {
		this.setState({
			...this.getState(),
			loading: false,
			open: false
		});
	};

	updateNormaError = (errors) => {
		this.setState({
			...this.getState(),
			loading: false,
			errors
		});
	};

	asyncUpdateNorma = (idNorma, norma) => {
		this.setLoading(true);
		return UpdateNorma(idNorma, norma).then(resp => {
            this.updateNormaSuccess();
            return null;
		}).catch(err => {
			const errors = err.data && err.data.errors ? err.data.errors : null;
			this.updateNormaError(errors);
		});
	};


}