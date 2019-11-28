import React from "react";
import { DatePicker as DPicker } from "@material-ui/pickers";

const dateFormat = "DD/MM/YYYY";
const DatePicker = ({ onChange, value, label, disabled, ...props }) => {
  return (
    <DPicker
      format={dateFormat}
      autoOk
      clearable
      label={label}
      value={value}
      onChange={onChange}
      animateYearScrolling={false}
      disabled={disabled}
      cancelLabel="Cancelar"
      disableFuture
      clearLabel="Limpiar"
      {...props}
    />
  );
};

DatePicker.defaultProps = {};

export default DatePicker;
