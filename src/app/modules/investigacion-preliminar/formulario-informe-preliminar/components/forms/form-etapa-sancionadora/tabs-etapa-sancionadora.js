import React, { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ModalResolucionConclusion from "./modal-resolucion-conclusion";
import {
  TabsEtapaSancionadoraReducer,
  defaultState,
  ACTIONS
} from "../_reducers/tabs-etapa-sancionadora.reducer";
import ButtonsEtapaSancionadora from "./buttons-etapa-sancionadora";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Show from "app/core/components/show";
import FormProgramacionIo from "./form-programacion-io";
import { FORM_TYPE } from "app/core/enums/enums";
import GridActaIO from "./grid-acta-io";
import confirm from "app/core/components/confirm";
import FormRemisionInformeOI from "./form-remision-informe-oi";
import GridSolicitudInformeOral from "./grid-solicitud-informe-oral";

const useStyles = makeStyles(theme => ({
  tabContainer: {
    marginTop: theme.spacing(3)
  }
}));

/**
 *
 * @param {{
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas,
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */

const TabsEtapaSancionadora = ({
  idExpedienteInvestigacion,
  etapasContainer,
  store,
  onCancel
}) => {
  const classes = useStyles();

  const [tab, setTab] = useState(0);
  /**
   * @type [import("../_reducers/tabs-etapa-sancionadora.reducer").defaultState]
   */
  const [container, dispatch] = useReducer(
    TabsEtapaSancionadoraReducer,
    defaultState
  );

  useEffect(() => {
    ACTIONS.ASYNC_GET_ETAPA3(dispatch)(idExpedienteInvestigacion);
  }, []);

  const handleGuardar = () => {
    const onConfirm = () => {
      switch (container.formType) {
        case FORM_TYPE.REGISTRAR:
          ACTIONS.ASYNC_SAVE_ETAPA3(dispatch)({
            ...container.form,
            idExpedienteInvestigacion
          })
          break;
        case FORM_TYPE.EDITAR:
          // ACTIONS.ASYNC_UPDATE_ETAPA3(dispatch)(idExpedienteInvestigacion, {
          //   ...container.form
          // });
          break;
      }
    };

    confirm("Va a guardar el formulario. ¿Continuar?").then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handleCancelar = () => {
    confirm("Va a salir del formulario. ¿Continuar?").then(c => {
      if (c) onCancel();
    });
  };

  const handleOpenModalResolucion = () => {
    dispatch(ACTIONS.OPEN_MODAL_CONC_RESOL());
  };

  const handleCloseModalResolucion = () => {
    dispatch(ACTIONS.CLOSE_MODAL_CONC_RESOL());
  };

  const handleChangeInputRemision = (prop, value) => {
    dispatch(ACTIONS.CHANGE_INPUT_REMISION(prop, value));
  };

  const handleChangeInputProgramaIO = (prop, value) => {
    dispatch(ACTIONS.CHANGE_INPUT_PROGRAMA_IO(prop, value));
  };

  const handlePushDocsSolicitudIO = files => {
    // if (container.formType == FORM_TYPE.REGISTRAR) {
    //   dispatch(ACTIONS.PUSH_DOCS_SOLICITUD_IO(files));
    // } else {
    ACTIONS.ASYNC_SAVE_SOLICITUD_INFORME_ORAL(dispatch)(
      idExpedienteInvestigacion,
      files
    ).then(_files => {
      dispatch(ACTIONS.PUSH_DOCS_SOLICITUD_IO(_files));
    });
    // }
  };

  const handleDeleteDocsSolicitudIO = (index, idArchivoAdjunto) => {
    const onConfirm = () => {
      // if (container.formType == FORM_TYPE.REGISTRAR) {
      //   dispatch(ACTIONS.DELETE_DOCS_SOLICITUD_IO(index));
      // } else {
      ACTIONS.ASYNC_DELETE_SOLICITUD_INFORME_ORAL(dispatch)(
        idExpedienteInvestigacion,
        idArchivoAdjunto
      ).then(() => {
        dispatch(ACTIONS.DELETE_DOCS_SOLICITUD_IO(index));
      });
      // }
    };

    confirm("Va a eliminar el archivo. ¿Continuar?").then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handlePushArchivoIO = files => {
    // if (container.formType == FORM_TYPE.REGISTRAR) {
    //   dispatch(ACTIONS.PUSH_ARCHIVO_IO(files));
    // } else {
    ACTIONS.ASYNC_SAVE_ACTA_INFORME_ORAL(dispatch)(
      idExpedienteInvestigacion,
      files
    ).then(_files => {
      dispatch(ACTIONS.PUSH_ARCHIVO_IO(_files));
    });
    // }
  };

  const handleDeleteArchivoIO = (index, idArchivoAdjunto) => {
    const onConfirm = () => {
      // if (container.formType == FORM_TYPE.REGISTRAR) {
      //   dispatch(ACTIONS.DELETE_ARCHIVO_IO(index));
      // } else {
      ACTIONS.ASYNC_DELETE_ACTA_INFORME_ORAL(dispatch)(
        idExpedienteInvestigacion,
        idArchivoAdjunto
      ).then(() => {
        dispatch(ACTIONS.DELETE_ARCHIVO_IO(index));
      });
      // }
    };

    confirm("Va a eliminar el archivo. ¿Continuar?").then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  return (
    <>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, value) => setTab(value)}
      >
        <Tab label="Remite Inf. Órgano Instructor" />
        <Tab label="Solicitud de Informe Oral" />
        <Tab label="Programación de Informe Oral" />
        <Tab label="Acta de Informe Oral" />
      </Tabs>

      <div className={classes.tabContainer}>
        <Show condition={tab == 0}>
          <FormRemisionInformeOI
            setInput={handleChangeInputRemision}
            form={container.form.remisionInformeOi}
            loading={container.loading}
            readonly={container.formType == FORM_TYPE.CONSULTAR}
            errors={container.errors.remisionInformeOi.errors}
          ></FormRemisionInformeOI>
        </Show>

        <Show condition={tab == 1}>
          <GridSolicitudInformeOral
            archivos={container.form.archivosSolicitudInformeOral}
            onAdd={handlePushDocsSolicitudIO}
            onDelete={handleDeleteDocsSolicitudIO}
            readonly={container.formType == FORM_TYPE.CONSULTAR}
          ></GridSolicitudInformeOral>
        </Show>

        <Show condition={tab == 2}>
          <FormProgramacionIo
            setInput={handleChangeInputProgramaIO}
            form={container.form.programaInformeOral}
            loading={container.loading}
            readonly={container.formType == FORM_TYPE.CONSULTAR}
            errors={container.errors.programacionInformeOral.errors}
          ></FormProgramacionIo>
        </Show>

        <Show condition={tab == 3}>
          <GridActaIO
            archivos={container.form.archivosActaInformeOral}
            onAdd={handlePushArchivoIO}
            onDelete={handleDeleteArchivoIO}
            readonly={container.formType == FORM_TYPE.CONSULTAR}
          ></GridActaIO>
        </Show>
      </div>

      <ModalResolucionConclusion
        open={container.modalConslusionResolucion.open}
        onClose={handleCloseModalResolucion}
        etapasContainer={etapasContainer}
        store={store}
        idExpedienteInvestigacion={idExpedienteInvestigacion}
      ></ModalResolucionConclusion>

      <ButtonsEtapaSancionadora
        labelButtonPurple={"Emisión Resol."}
        showButtonPurple={true}
        onClickButtonPurple={handleOpenModalResolucion}
        onClickCancelar={handleCancelar}
        onClickGuardar={handleGuardar}
        disabled={container.loading}
        showButtonGuardar={container.formType != FORM_TYPE.CONSULTAR}
      ></ButtonsEtapaSancionadora>
    </>
  );
};

export default TabsEtapaSancionadora;
