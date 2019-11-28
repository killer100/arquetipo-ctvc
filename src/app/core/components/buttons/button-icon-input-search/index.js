import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";

const ButtonIconInputSearch = ({
  found,
  onClickSearch,
  onClickRemove,
  disabled
}) => (
  <InputAdornment position="end">
    {found ? (
      <IconButton onClick={onClickRemove} disabled={disabled}>
        <Icon>delete</Icon>
      </IconButton>
    ) : (
      <IconButton onClick={onClickSearch} disabled={disabled}>
        <Icon>search</Icon>
      </IconButton>
    )}
  </InputAdornment>
);
export default ButtonIconInputSearch;
