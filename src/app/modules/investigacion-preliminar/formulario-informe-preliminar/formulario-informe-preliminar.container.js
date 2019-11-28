import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { buildStore } from "app/core/store/base-store";
import FormInformePreliminar from "./components/forms/form-informe-preliminar";
import { initialState } from "./_store/_initial-state";
import { FormularioInformePreliminarStore } from "./_store/formulario-informe-preliminar.store";
import PageTitle from "app/core/components/page-title";
import FormCartaInicioPad from "./components/forms/form-carta-inicio-pad";
import FormDestinoNotificacion from "./components/forms/form-destino-notificacion";
import { AppConfig } from "app/core/config/app.config";
import StepInformePreliminar from "./components/misc/step-informe-preliminar";
import FormEtapaInstructiva from "./components/forms/form-etapa-instructiva";
import FormEtapaSancionadora from "./components/forms/form-etapa-sancionadora";

const parentRoute = `${AppConfig.urlBaseProject}/investigacion`;

class FormularioInformePreliminarContainer extends React.Component {
  state = { ...initialState };
  /**
   * @type FormularioInformePreliminarStore
   */
  store = buildStore(
    () => this.state,
    this.setState.bind(this),
    FormularioInformePreliminarStore
  );

  componentDidMount() {
    // const { idInformePreliminar } = this.props.match.params;
    // if (idInformePreliminar) {
    //   this.store.containerInformePreliminarActions.setIdInformePreliminar(
    //     idInformePreliminar
    //   );
    // }
    const { idExpedienteInvestigacion } = this.props.match.params;
    this.store.containerEtapasActions
      .asyncGetEtapas(idExpedienteInvestigacion)
      .then(etapas => {
        this.handleStep(0)();
      });
  }

  handleSaveInformePreliminar = id => {
    const { idExpedienteInvestigacion } = this.props.match.params;
    // this.props.history.push(
    //   `${parentRoute}/${idExpedienteInvestigacion}/informe-preliminar/${id}`
    // );
  };

  handleCancel = () => {
    this.props.history.push(parentRoute);
  };

  handleStep = activeStep => () => {
    this.store.containerEtapasActions.setActiveStep(activeStep);
    const { etapas } = this.state.containerEtapas;
    switch (activeStep) {
      case 0:
        if (etapas.etapa1.id) {
          this.store.containerInformePreliminarActions.setIdInformePreliminar(
            etapas.etapa1.id
          );
        }
        break;
      case 1:
        break;
      case 2:
        break;
    }
  };

  render() {
    const {
      containerInformePreliminar,
      modalCartaInicioPad,
      modalDestinoNotificacion,
      containerEtapas
    } = this.state;
    const { idExpedienteInvestigacion } = this.props.match.params;
    //console.log(this.props.match.params.idInformePreliminar);
    return (
      <>
        {containerEtapas.etapas && <PageTitle text={`Expediente de Denuncia - N° ${containerEtapas.etapas.numeroExpediente}`} />}
        <Card>
          <CardContent>
            {containerEtapas.etapas && (
              <>
                <StepInformePreliminar
                  activeStep={containerEtapas.activeStep}
                  handleStep={this.handleStep}
                  idTipoSancion={containerEtapas.etapas.idTipoSancion}
                  etapa2Id={containerEtapas.etapas.etapa2.id}
						etapa3Id={containerEtapas.etapas.etapa3.id}
						esConcluido={containerEtapas.etapas.esConcluido}
                />
                {containerEtapas.activeStep == 0 && (
                  <FormInformePreliminar
                    container={containerInformePreliminar}
                    store={this.store}
                    idExpedienteInvestigacion={idExpedienteInvestigacion}
                    onSaveFinish={this.handleSaveInformePreliminar}
                    onCancel={this.handleCancel}
                  />
                )}
                {containerEtapas.activeStep == 1 && (
                  <FormEtapaInstructiva
                    idExpedienteInvestigacion={idExpedienteInvestigacion}
                    etapasContainer={containerEtapas}
                    store={this.store}
                    onCancel={this.handleCancel}
                  />
                )}
                {containerEtapas.activeStep == 2 && (
                  <FormEtapaSancionadora
                    idExpedienteInvestigacion={idExpedienteInvestigacion}
                    etapasContainer={containerEtapas}
                    store={this.store}
                    onCancel={this.handleCancel}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>

        <FormCartaInicioPad modal={modalCartaInicioPad} store={this.store} />

        <FormDestinoNotificacion
          modal={modalDestinoNotificacion}
          store={this.store}
          idExpedienteInvestigacion={idExpedienteInvestigacion}
        />
      </>
    );
  }
}

export default FormularioInformePreliminarContainer;
