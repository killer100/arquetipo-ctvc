import React, { useState, useEffect } from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepButton from '@material-ui/core/StepButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  stepperRoot: {
    marginBottom: theme.spacing(4)
  }
}));

const StepInformePreliminar = ({
  activeStep,
  handleStep,
  idTipoSancion,
  etapa2Id,
  etapa3Id,
  esConcluido
}) => {
  const [etapa2Title, setEtapa2Title] = useState('Etapa Instructiva');
  const [etapa3Title, setEtapa3Title] = useState('Etapa Sancionadora');

  useEffect(() => {
    if (idTipoSancion && idTipoSancion == 1) {
      setEtapa2Title('Etapa Instructiva Sancionadora');
      setEtapa3Title('Etapa Oficialización de Sanción');
    }
  }, [idTipoSancion]);

  const classes = useStyles();

  return (
    <div className={classes.stepperRoot}>
      <Stepper activeStep={activeStep} nonLinear>
        <Step>
          <StepButton
            onClick={handleStep(0)}
            completed={etapa2Id == null || etapa2Id != undefined}
          >
            Investigación Previa
          </StepButton>
        </Step>
        <Step>
          <StepButton
            onClick={handleStep(1)}
            disabled={!etapa2Id}
            completed={etapa3Id == null || etapa3Id != undefined}
          >
            {etapa2Title}
          </StepButton>
        </Step>
        <Step>
          <StepButton
            onClick={handleStep(2)}
            disabled={!etapa3Id}
            completed={esConcluido}
          >
            {etapa3Title}
          </StepButton>
        </Step>
      </Stepper>
    </div>
  );
};

export default StepInformePreliminar;
