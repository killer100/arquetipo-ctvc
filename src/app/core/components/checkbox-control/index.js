import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckboxControl = ({
  className,
  label,
  value,
  color,
  onChange,
  checked,
  disabled
}) => {
  return (
    <FormControlLabel
      className={className}
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          value={value}
          color={color}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

CheckboxControl.defaultProps = {
  disabled: false
};

export default CheckboxControl;
