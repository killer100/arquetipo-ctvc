import React, { useReducer, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import confirm from 'app/core/components/confirm';
import Show from 'app/core/components/show';
import ButtonsEtapaInstructiva from './buttons-etapa-instructiva';
import FormAmpliacionPlazo from './form-ampliacion-plazo';
import ModalInformeOrganoInstructivo from './modal-informe-organo-instructivo';
import {
  FormEtapaInstructivaReducer,
  CHANGE_INPUT_AMP,
  CHANGE_INPUT_PROGRAMA_IO,
  DELETE_ARCHIVO_IO,
  DELETE_DOCS_DESCARGO,
  PUSH_ARCHIVO_IO,
  PUSH_DOCS_DESCARGO,
  ACTIONS
} from './../_reducers/form-etapa-instructiva.reducer';
import { buildFormEtapaInstructiva } from '../../../_store/_initial-state';
import FormProgramacionIo from './form-programacion-io';
import GridDocumentosDescargo from './grid-documentos-descargo';
import GridActaIO from './grid-acta-io';
import { FORM_TYPE } from 'app/core/enums/enums';
import { TIPO_SANCION } from 'app/core/enums/bussiness/enums';

const useStyles = makeStyles(theme => ({
  tabContainer: {
    marginTop: theme.spacing(3)
  }
}));

const defaultModalInformeInstructivo = {
  open: false,
  idInformeOrganoInstructivo: null
};

/**
 *
 * @param {{
 *  etapasContainer: import('../../../_store/_initial-state').containerEtapas,
 *  store: import('../../../_store/formulario-informe-preliminar.store').FormularioInformePreliminarStore,
 * }} param0
 */
const FormEtapaInstructiva = ({
  idExpedienteInvestigacion,
  etapasContainer,
  store,
  onCancel
}) => {
  const [tab, setTab] = useState(0);
  const [formType, setFormType] = useState(FORM_TYPE.REGISTRAR);
  const [modalInformeOrganoIns, setModalInformeOrganoIns] = useState(
    defaultModalInformeInstructivo
  );
  const classes = useStyles();

  const esAmonestacion =
    etapasContainer.etapas.idTipoSancion == TIPO_SANCION.AMONESTACION;
  /**
   * @type [import("../../../_store/_initial-state").IFormEtapaInstructuva]
   */
  const [modal, dispatch] = useReducer(
    FormEtapaInstructivaReducer,
    buildFormEtapaInstructiva()
  );

  useEffect(() => {
    ACTIONS.ASYNC_GET_ETAPA2(dispatch)(idExpedienteInvestigacion);
  }, []);

  const handleChangeInputAmpliacion = (prop, value) => {
    dispatch(CHANGE_INPUT_AMP(prop, value));
  };

  const handleChangeInputProgramaIO = (prop, value) => {
    dispatch(CHANGE_INPUT_PROGRAMA_IO(prop, value));
  };

  const handlePushDocsDescargo = files => {
    // if (formType == FORM_TYPE.REGISTRAR) {
    //   dispatch(PUSH_DOCS_DESCARGO(files));
    // } else {
    ACTIONS.ASYNC_SAVE_DOCUMENTO_DESCARGO(dispatch)(
      idExpedienteInvestigacion,
      files
    ).then(_files => {
      dispatch(PUSH_DOCS_DESCARGO(_files));
    });
    // }
  };

  const handleDeleteDocsDescargo = (index, idArchivoAdjunto) => {
    const onConfirm = () => {
      // if (formType == FORM_TYPE.REGISTRAR) {
      //   dispatch(DELETE_DOCS_DESCARGO(index));
      // } else {
      ACTIONS.ASYNC_DELETE_DOCUMENTO_DESCARGO(dispatch)(
        idExpedienteInvestigacion,
        idArchivoAdjunto
      ).then(() => {
        dispatch(DELETE_DOCS_DESCARGO(index));
      });
      // }
    };

    confirm('Va a eliminar el archivo. ¿Continuar?').then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handlePushArchivoIO = files => {
    // if (formType == FORM_TYPE.REGISTRAR) {
    //   dispatch(PUSH_ARCHIVO_IO(files));
    // } else {
      ACTIONS.ASYNC_SAVE_ACTA_INFORME_ORAL(dispatch)(
        idExpedienteInvestigacion,
        files
      ).then(_files => {
        dispatch(PUSH_ARCHIVO_IO(_files));
      });
    // }
  };

  const handleDeleteArchivoIO = (index, idArchivoAdjunto) => {
    const onConfirm = () => {
      // if (formType == FORM_TYPE.REGISTRAR) {
      //   dispatch(DELETE_ARCHIVO_IO(index));
      // } else {
        ACTIONS.ASYNC_DELETE_ACTA_INFORME_ORAL(dispatch)(
          idExpedienteInvestigacion,
          idArchivoAdjunto
        ).then(() => {
          dispatch(DELETE_ARCHIVO_IO(index));
        });
      // }
    };

    confirm('Va a eliminar el archivo. ¿Continuar?').then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handleClickSave = () => {
    const onConfirm = () => {
      switch (formType) {
        case FORM_TYPE.REGISTRAR:
          ACTIONS.ASYNC_SAVE_ETAPA2(dispatch)({
            ...modal.form,
            idExpedienteInvestigacion
          });
          break;
        case FORM_TYPE.EDITAR:
          // ACTIONS.ASYNC_UPDATE_ETAPA2(dispatch)(idExpedienteInvestigacion, {
          //   ...modal.form
          // });
          break;
      }
    };

    confirm('Va a guardar el formulario. ¿Continuar?').then(c => {
      if (c) {
        onConfirm();
      }
    });
  };

  const handleCancelar = () => {
    confirm('Va a salir del formulario. ¿Continuar?').then(c => {
      if (c) onCancel();
    });
  };

  const handleOpenModalInfOrgIns = () => {
    setModalInformeOrganoIns({
      ...modalInformeOrganoIns,
      open: true,
      idInformeOrganoInstructivo:
        etapasContainer.etapas.etapa2.idInformeOrganoInstructivo
    });
  };

  const handleCloseModalInfOrgIns = () => {
    setModalInformeOrganoIns({
      ...modalInformeOrganoIns,
      open: false
    });
  };

  const handleResetModalInfOrgIns = () => {
    setModalInformeOrganoIns(defaultModalInformeInstructivo);
  };

  return (
    <>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, value) => setTab(value)}
      >
        <Tab label="Ampliación de Plazo" />
        <Tab label="Documentos Descargo" />
        {esAmonestacion && <Tab label="Programación de Informe Oral" />}
        {esAmonestacion && <Tab label="Acta de Informe Oral" />}

      </Tabs>
      <div className={classes.tabContainer}>
        <Show condition={tab == 0}>
          <FormAmpliacionPlazo
            setInput={handleChangeInputAmpliacion}
            form={modal.form.ampliacionPlazo}
            loading={modal.loading}
            errors={modal.errors.ampliacionPlazo.errors}
          ></FormAmpliacionPlazo>
        </Show>
        <Show condition={tab == 1}>
          <GridDocumentosDescargo
            archivos={modal.form.archivosDocumentosDescargo}
            onAdd={handlePushDocsDescargo}
            onDelete={handleDeleteDocsDescargo}
            readonly={false}
          ></GridDocumentosDescargo>
        </Show>
        <Show condition={tab == 2 && esAmonestacion}>
          <FormProgramacionIo
            setInput={handleChangeInputProgramaIO}
            form={modal.form.programaInformeOral}
            loading={modal.loading}
            readonly={false}
            errors={modal.errors.programacionInformeOral.errors}
          ></FormProgramacionIo>
        </Show>
        <Show condition={tab == 3 && esAmonestacion}>
          <GridActaIO
            archivos={modal.form.archivosActaInformeOral}
            onAdd={handlePushArchivoIO}
            onDelete={handleDeleteArchivoIO}
            readonly={false}
          ></GridActaIO>
        </Show>
      </div>
      <ButtonsEtapaInstructiva
        onClickGuardar={handleClickSave}
        showButtonInformeOI={true}
        onClickInformeOI={handleOpenModalInfOrgIns}
        onClickCancelar={handleCancelar}
        showButtonGuardar={formType != FORM_TYPE.CONSULTAR}
      ></ButtonsEtapaInstructiva>
      <ModalInformeOrganoInstructivo
        open={modalInformeOrganoIns.open}
        onClose={handleCloseModalInfOrgIns}
        onReset={handleResetModalInfOrgIns}
        idExpedienteInvestigacion={idExpedienteInvestigacion}
        idInformeOrganoInstructivo={
          modalInformeOrganoIns.idInformeOrganoInstructivo
        }
        etapasContainer={etapasContainer}
        store={store}
      ></ModalInformeOrganoInstructivo>
    </>
  );
};

export default FormEtapaInstructiva;
