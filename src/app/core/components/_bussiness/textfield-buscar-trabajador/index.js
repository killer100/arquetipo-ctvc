import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "app/core/components/autocomplete";
import { URL_AUTOCOMPLETE_EMPLEADOS } from "app/core/api/maestros.api";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Show from "../../show";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonDelete: {
    padding: 0
  }
}));

const TextfieldBuscarTrabajador = ({
  showAutocomplete,
  readonly,
  loading,
  label,
  placeholder,
  onRemove,
  value,
  onSelect,
  helperText,
  error
}) => {
  const classes = useStyles();
  return (
    <>
      <Show condition={showAutocomplete && !readonly}>
        <Autocomplete
          disabled={loading}
          placeholder={placeholder}
          clearOnSelect
          labelProp="nombreFormat"
          onSelect={t => {
            onSelect({
              ...t,
              nombreFormat: `${t.nombres} ${t.primerApellido} ${t.segundoApellido}`
            });
          }}
          url={URL_AUTOCOMPLETE_EMPLEADOS}
          suggestionsProp="data.trabajadores"
          textFieldProps={{
            helperText: helperText,
            error: error
          }}
        />
      </Show>

      <Show condition={!showAutocomplete}>
        <TextField
          fullWidth
          label={label}
          value={value || ""}
          InputProps={{
            endAdornment: !readonly && (
              <IconButton className={classes.buttonDelete} disabled={loading} onClick={onRemove}>
                <Icon>delete</Icon>
              </IconButton>
            )
          }}
          helperText={helperText}
          error={error}
          disabled={loading || readonly}
        />
      </Show>
    </>
  );
};

export default TextfieldBuscarTrabajador;
