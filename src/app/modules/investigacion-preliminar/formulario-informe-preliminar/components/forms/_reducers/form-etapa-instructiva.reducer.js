import {
	buildFormEtapaInstructiva
} from "../../../_store/_initial-state";
import update from "immutability-helper";
import {
	GetEtapa2,
	SaveEtapa2,
	UpdateEtapa2,
	SaveDocumentoDescargo,
	DeleteDocumentoDescargo,
	SaveActaInformeOral,
	DeleteActaInformeOral
} from "../../../api/etapa2.api";

const SHOW_LOADING = () => ({
	type: "SHOW_LOADING"
});

const HIDE_LOADING = () => ({
	type: "HIDE_LOADING"
});

const RESET = () => ({
	type: "RESET"
});

export const CHANGE_INPUT_AMP = (prop, value) => ({
	type: "CHANGE_INPUT_AMP",
	payload: {
		prop,
		value
	}
});

export const CHANGE_INPUT_PROGRAMA_IO = (prop, value) => ({
	type: "CHANGE_INPUT_PROGRAMA_IO",
	payload: {
		prop,
		value
	}
});

export const PUSH_DOCS_DESCARGO = files => ({
	type: "PUSH_DOCS_DESCARGO",
	payload: {
		files
	}
});

export const DELETE_DOCS_DESCARGO = rowIndex => ({
	type: "DELETE_DOCS_DESCARGO",
	payload: {
		rowIndex
	}
});

export const PUSH_ARCHIVO_IO = files => ({
	type: "PUSH_ARCHIVO_IO",
	payload: {
		files
	}
});

export const DELETE_ARCHIVO_IO = rowIndex => ({
	type: "DELETE_ARCHIVO_IO",
	payload: {
		rowIndex
	}
});

export const SET_FORM = form => ({
	type: "SET_FORM",
	payload: {
		form
	}
});

export const SET_ERRORS = errors => ({
	type: "SET_ERRORS",
	payload: {
		errors
	}
});

const CLEAN_ERRORS = () => ({
	type: "CLEAN_ERRORS"
});

//

const SET_AMPLIACION_PLAZO = ampliacionPlazo => ({
	type: "SET_AMPLIACION_PLAZO",
	payload: {
		ampliacionPlazo
	}
});

const SET_PROGRAMA_INFORME_ORAL = programacionInformeOral => ({
	type: "SET_PROGRAMA_INFORME_ORAL",
	payload: {
		programacionInformeOral
	}
});

const SET_DOCS_DESCARGO = archivosDocumentosDescargo => ({
	type: "SET_DOCS_DESCARGO",
	payload: {
		archivosDocumentosDescargo
	}
});

const SET_ARCHIVOS_IO = archivosActaInformeOral => ({
	type: "SET_ARCHIVOS_IO",
	payload: {
		archivosActaInformeOral
	}
});

//


const ASYNC_GET_ETAPA2 = dispatch => idExpedienteInvestigacion => {
	dispatch(SHOW_LOADING());
	return GetEtapa2(idExpedienteInvestigacion).then(resp => {
		dispatch(HIDE_LOADING());
		if (resp.data.etapa2) {
			if (resp.data.etapa2.ampliacionPlazo) {
				dispatch(SET_AMPLIACION_PLAZO(resp.data.etapa2.ampliacionPlazo));
			}

			if (resp.data.etapa2.programacionInformeOral) {
				dispatch(SET_PROGRAMA_INFORME_ORAL(resp.data.etapa2.programacionInformeOral));
			}

			if (resp.data.etapa2.archivosDocumentosDescargo) {
				dispatch(SET_DOCS_DESCARGO(resp.data.etapa2.archivosDocumentosDescargo));
			}

			if (resp.data.etapa2.archivosActaInformeOral) {
				dispatch(SET_ARCHIVOS_IO(resp.data.etapa2.archivosActaInformeOral));
			}
		}
	});
};

const ASYNC_SAVE_ETAPA2 = dispatch => formEtapa2 => {
	dispatch(SHOW_LOADING());
	dispatch(CLEAN_ERRORS())
	return SaveEtapa2(formEtapa2)
		.then(resp => {
			dispatch(HIDE_LOADING());
			return resp.msg;
		})
		.catch(err => {
			dispatch(HIDE_LOADING());

			const errors = err.data && err.data.errors ? err.data.errors : {
				ampliacionPlazo: { errors: null },
				programacionInformeOral: { errors: null }
			};
			dispatch(SET_ERRORS(errors));

			throw err;
		});
};

const ASYNC_UPDATE_ETAPA2 = dispatch => (
	idExpedienteInvestigacion,
	formEtapa2
) => {
	dispatch(SHOW_LOADING());
	dispatch(CLEAN_ERRORS())
	return UpdateEtapa2(idExpedienteInvestigacion, formEtapa2)
		.then(resp => {
			dispatch(HIDE_LOADING());
			return resp.msg;
		})
		.catch(err => {
			dispatch(HIDE_LOADING());

			const errors = err.data && err.data.errors ? err.data.errors : {
				ampliacionPlazo: { errors: null },
				programacionInformeOral: { errors: null }
			};
			dispatch(SET_ERRORS(errors));

			throw errors;
		});
};

const ASYNC_SAVE_DOCUMENTO_DESCARGO = dispatch => (
	idExpedienteInvestigacion,
	files
) => {
	dispatch(SHOW_LOADING());

	return new Promise(async resolve => {
		let filesResponse = [];
		try {
			for (const i in files) {
				const resp = await SaveDocumentoDescargo(
					idExpedienteInvestigacion,
					files[i]
				);
				filesResponse.push({
					...files[i],
					idArchivoAdjunto: resp.data.id
				});
			}

			dispatch(HIDE_LOADING());
			resolve(filesResponse);
		} catch (e) {
			console.log(e);
			dispatch(HIDE_LOADING());
		}
	});
};

const ASYNC_DELETE_DOCUMENTO_DESCARGO = dispatch => (
	idExpedienteInvestigacion,
	idArchivoAdjunto
) => {
	dispatch(SHOW_LOADING());
	return DeleteDocumentoDescargo(
		idExpedienteInvestigacion,
		idArchivoAdjunto
	).then(() => {
		dispatch(HIDE_LOADING());
		return null;
	});
};

const ASYNC_SAVE_ACTA_INFORME_ORAL = dispatch => (
	idExpedienteInvestigacion,
	files
) => {
	dispatch(SHOW_LOADING());

	return new Promise(async resolve => {
		let filesResponse = [];
		try {
			for (const i in files) {
				const resp = await SaveActaInformeOral(
					idExpedienteInvestigacion,
					files[i]
				);
				filesResponse.push({
					...files[i],
					idArchivoAdjunto: resp.data.id
				});
			}

			dispatch(HIDE_LOADING());
			resolve(filesResponse);
		} catch (e) {
			console.log(e);
			dispatch(HIDE_LOADING());
		}
	});
};

const ASYNC_DELETE_ACTA_INFORME_ORAL = dispatch => (
	idExpedienteInvestigacion,
	idArchivoAdjunto
) => {
	dispatch(SHOW_LOADING());
	return DeleteActaInformeOral(
		idExpedienteInvestigacion,
		idArchivoAdjunto
	).then(() => {
		dispatch(HIDE_LOADING());
		return null;
	});
};

export const ACTIONS = {
	SHOW_LOADING,
	HIDE_LOADING,
	RESET,
	ASYNC_GET_ETAPA2,
	ASYNC_SAVE_ETAPA2,
	ASYNC_UPDATE_ETAPA2,
	ASYNC_SAVE_DOCUMENTO_DESCARGO,
	ASYNC_DELETE_DOCUMENTO_DESCARGO,
	ASYNC_SAVE_ACTA_INFORME_ORAL,
	ASYNC_DELETE_ACTA_INFORME_ORAL
};

/**
 * @param {import("../../../_store/_initial-state").IFormEtapaInstructuva} state
 */
export const FormEtapaInstructivaReducer = (state, action) => {
	switch (action.type) {
		case "RESET":
			return buildFormEtapaInstructiva();

		case "CHANGE_INPUT_AMP":
			return update(state, {
				form: {
					ampliacionPlazo: {
						[action.payload.prop]: {
							$set: action.payload.value
						}
					}
				}
			});

		case "CHANGE_INPUT_PROGRAMA_IO":
			return update(state, {
				form: {
					programaInformeOral: {
						[action.payload.prop]: {
							$set: action.payload.value
						}
					}
				}
			});

		case "PUSH_DOCS_DESCARGO":
			return update(state, {
				form: {
					archivosDocumentosDescargo: {
						$push: action.payload.files
					}
				}
			});

		case "DELETE_DOCS_DESCARGO":
			return update(state, {
				form: {
					archivosDocumentosDescargo: {
						$splice: [
							[action.payload.rowIndex, 1]
						]
					}
				}
			});
		case "PUSH_ARCHIVO_IO":
			return update(state, {
				form: {
					archivosActaInformeOral: {
						$push: action.payload.files
					}
				}
			});

		case "DELETE_ARCHIVO_IO":
			return update(state, {
				form: {
					archivosActaInformeOral: {
						$splice: [
							[action.payload.rowIndex, 1]
						]
					}
				}
			});

		case "SET_FORM":
			return update(state, {
				form: {
					$set: action.payload.form
				}
			});

		case "SHOW_LOADING":
			return update(state, {
				loading: {
					$set: true
				}
			});

		case "HIDE_LOADING":
			return update(state, {
				loading: {
					$set: false
				}
			});
		case "SET_ERRORS":
			return update(state, {
				errors: {
					$set: action.payload.errors
				}
			});

		case "CLEAN_ERRORS":
			return update(state, {
				errors: {
					$set: {
						ampliacionPlazo: { errors: null },
						programacionInformeOral: { errors: null }
					}
				}
			});

		case "SET_AMPLIACION_PLAZO":
			return update(state, {
				form: {
					ampliacionPlazo: { $set: action.payload.ampliacionPlazo }
				}
			});

		case "SET_PROGRAMA_INFORME_ORAL":
			return update(state, {
				form: {
					programacionInformeOral: { $set: action.payload.programacionInformeOral }
				}
			});

		case "SET_DOCS_DESCARGO":
			return update(state, {
				form: {
					archivosDocumentosDescargo: { $set: action.payload.archivosDocumentosDescargo }
				}
			});

		case "SET_ARCHIVOS_IO":
			return update(state, {
				form: {
					archivosActaInformeOral: { $set: action.payload.archivosActaInformeOral }
				}
			});

		default:
			return state;
	}
};