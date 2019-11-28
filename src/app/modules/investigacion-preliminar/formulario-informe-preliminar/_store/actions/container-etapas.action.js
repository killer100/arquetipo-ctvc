import update from "immutability-helper";
import {
	GetEtapas
} from "../../api/expediente-investigacion.api";
/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ContainerEtapasActions {
	/**
	 * @param {() => import('../_initial-state').containerEtapas} getState
	 * @param {(state:import('../_initial-state').containerEtapas ) => void} setState
	 */
	constructor(getState, setState) {
		this.getState = getState;
		this.setState = setState;
	}

	setActiveStep = activeStep => {
		this.setState(
			update(this.getState(), {
				activeStep: {
					$set: activeStep
				}
			})
		);
	};

	setIdResolucionConclusionEtapa3 = idResolucionConclusion => {
		this.setState(
			update(this.getState(), {
				etapas: {
					esConcluido: {
						$set: true
					},
					etapa3: {
						idResolucionConclusion: {
							$set: idResolucionConclusion
						},
					}
				}
			})
		);
	};

	setIdDestinoNotificacionEtapa3 = idDestinoNotificacion => {
		this.setState(
			update(this.getState(), {
				etapas: {
					etapa3: {
						idDestinoNotificacion: {
							$set: idDestinoNotificacion
						}
					}
				}
			})
		);
	};

	setIdInformeOrganoInstructivoEtapa2 = (
		idInformeOrganoInstructivo, {
			idOrganoSancionador,
			descOrganoSancionador,
			idCargoOrganoSancionador,
			descCargoOrganoSancionador
		}
	) => {
		this.setState(
			update(this.getState(), {
				etapas: {
					idOrganoSancionadorInformeOi: {
						$set: idOrganoSancionador
					},
					descOrganoSancionadorInformeOi: {
						$set: descOrganoSancionador
					},
					idCargoOrganoSancionadorInformeOi: {
						$set: idCargoOrganoSancionador
					},
					descCargoOrganoSancionadorInformeOi: {
						$set: descCargoOrganoSancionador
					},
					etapa2: {
						idInformeOrganoInstructivo: {
							$set: idInformeOrganoInstructivo
						}
					},
					etapa3: {
						id: {
							$set: 1
						}
					}
				}
			})
		);
	};

	setActiveEtapa2 = ({
		idTipoSancion,
		idOrganoInstructor,
		descOrganoInstructor,
		idCargoOrganoInstructor,
		descCargoOrganoInstructor,
		idOrganoSancionador,
		descOrganoSancionador,
		idCargoOrganoSancionador,
		descCargoOrganoSancionador
	}) => {
		this.setState(
			update(this.getState(), {
				etapas: {
					idTipoSancion: {
						$set: idTipoSancion
					},
					idOrganoInstructor: {
						$set: idOrganoInstructor
					},
					descOrganoInstructor: {
						$set: descOrganoInstructor
					},
					idCargoOrganoInstructor: {
						$set: idCargoOrganoInstructor
					},
					descCargoOrganoInstructor: {
						$set: descCargoOrganoInstructor
					},
					idOrganoSancionador: {
						$set: idOrganoSancionador
					},
					descOrganoSancionador: {
						$set: descOrganoSancionador
					},
					idCargoOrganoSancionador: {
						$set: idCargoOrganoSancionador
					},
					descCargoOrganoSancionador: {
						$set: descCargoOrganoSancionador
					},
					etapa2: {
						id: {
							$set: 1
						}
					}
				}
			})
		);
	};

	setActiveEtapa3 = () => {
		this.setState(
			update(this.getState(), {
				etapas: {
					etapa3: {
						id: {
							$set: 1
						}
					}
				}
			})
		);
	};

	setOrganoSancionadorInformeOi = ({
		idOrganoSancionador,
		descOrganoSancionador,
		idCargoOrganoSancionador,
		descCargoOrganoSancionador
	}) => {
		this.setState(
			update(this.getState(), {
				etapas: {
					idOrganoSancionadorInformeOi: {
						$set: idOrganoSancionador
					},
					descOrganoSancionadorInformeOi: {
						$set: descOrganoSancionador
					},
					idCargoOrganoSancionadorInformeOi: {
						$set: idCargoOrganoSancionador
					},
					descCargoOrganoSancionadorInformeOi: {
						$set: descCargoOrganoSancionador
					}
				}
			})
		);
	};

	//=============================================
	// Obtener etapas
	//=============================================

	getEtapasBegin = () => {
		this.setState({
			...this.getState(),
			loading: true
		});
	};

	getEtapasSuccess = etapas => {
		this.setState({
			...this.getState(),
			loading: false,
			etapas
		});
	};

	getEtapasError = error => {
		this.setState({
			...this.getState(),
			loading: false,
			etapas: null,
			error
		});
	};

	asyncGetEtapas = idExpedienteInvestigacion => {
		this.getEtapasBegin();
		return GetEtapas(idExpedienteInvestigacion)
			.then(response => {
				this.getEtapasSuccess(response.data.etapas);
				return response.data.etapas;
			})
			.catch(err => {
				this.getEtapasError(err);
				return err;
			});
	};
}