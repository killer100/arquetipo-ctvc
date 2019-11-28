import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import update from "immutability-helper";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

const NONE_SELECTED = "__NONE__";

const SelectField = ({
  defaultOptionText,
  options,
  bindValue,
  bindLabel,
  value,
  onChange,
  loading,
  ...props
}) => {
  return (
    <TextField
      select
      value={!value ? NONE_SELECTED : value}
      onChange={(e, child) => {
        const value = e.target.value == NONE_SELECTED ? null : e.target.value;

        const newEvent = update(e, { target: { value: { $set: value } } });

        onChange && onChange(newEvent, child);
      }}
      InputProps={{
        endAdornment: loading && (
          <InputAdornment position="start">
            <CircularProgress size={15} />
          </InputAdornment>
        )
      }}
      {...props}
    >
      <MenuItem value={NONE_SELECTED}>--{defaultOptionText}--</MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option[bindValue]}>
          {option[bindLabel]}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectField.defaultProps = {
  options: [],
  bindValue: "value",
  bindLabel: "label",
  SelectProps: {},
  loading: false,
  defaultOptionText: "Seleccione"
};

export default SelectField;
