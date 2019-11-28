import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const DetalleDistrito = ({
  descripcionRegion,
  descripcionProvincia,
  descripcionDistrito,
  onRemoveDistrito,
  loading,
  showRemoveButton,
}) => {  
  return (
    <TextField
      fullWidth
      disabled={loading}
      readOnly={true}
      value={`${descripcionRegion} - ${descripcionProvincia} - ${descripcionDistrito}`}
      InputProps={{
        endAdornment: showRemoveButton && (
          <>
            <IconButton
              onClick={onRemoveDistrito}
              type="button"
            >
              <Icon>delete</Icon>
            </IconButton>
          </>
        ),
      }}
    />
  );
};
export default DetalleDistrito;
