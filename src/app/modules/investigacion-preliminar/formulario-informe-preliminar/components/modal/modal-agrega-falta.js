import React, { useState } from "react";
import ModalContainer from "app/core/components/modal-container";
import Autocomplete from "app/core/components/autocomplete";
import { URL_AUTOCOMPLETE_FALTAS } from "app/core/api/maestros.api";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    minHeight: 250
  }
}));

const ModalAgregaFalta = ({ open, onAdd, onClose }) => {
  const [searching, setSearching] = useState(false);
  const classes = useStyles();
  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={"Agregar Falta Tipificada"}
      maxWidth={"md"}
      fullWidth={true}
      cancelLabel="Cerrar"
      showSaveButton={false}
    >
      <div className={classes.modalRoot}>
        <Autocomplete
          disabled={searching}
          placeholder="Buscar Literal de la Falta - Descripción de la Falta Tipificada"
          clearOnSelect
          labelProp="numeroFaltaFormat"
          onSelect={falta => {
            onAdd(falta);
          }}
          url={URL_AUTOCOMPLETE_FALTAS}
          suggestionsProp="data.faltas"
        />
      </div>
    </ModalContainer>
  );
};

export default ModalAgregaFalta;
