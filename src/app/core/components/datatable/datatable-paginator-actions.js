import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
});

const DataTablePaginatorActions = ({
  classes,
  count,
  page,
  rowsPerPage,
  theme,
  disabled,
  nextIconButtonProps,
  onChangePage
}) => {
  const handleFirstPageButtonClick = event => {
    onChangePage(0);
  };

  const handleBackButtonClick = event => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0 || nextIconButtonProps.disabled}
        aria-label="First Page"
      >
        {theme.direction === "rtl" ? (
          <Icon>last_page</Icon>
        ) : (
          <Icon>first_page</Icon>
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0 || nextIconButtonProps.disabled}
        aria-label="Previous Page"
      >
        {theme.direction === "rtl" ? (
          <Icon>keyboard_arrow_right</Icon>
        ) : (
          <Icon>keyboard_arrow_left</Icon>
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={
          page >= Math.ceil(count / rowsPerPage) - 1 ||
          nextIconButtonProps.disabled
        }
        aria-label="Next Page"
      >
        {theme.direction === "rtl" ? (
          <Icon>keyboard_arrow_left</Icon>
        ) : (
          <Icon>keyboard_arrow_right</Icon>
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={
          page >= Math.ceil(count / rowsPerPage) - 1 ||
          nextIconButtonProps.disabled
        }
        aria-label="Last Page"
      >
        {theme.direction === "rtl" ? (
          <Icon>first_page</Icon>
        ) : (
          <Icon>last_page</Icon>
        )}
      </IconButton>
    </div>
  );
};

export default withStyles(styles, {
  withTheme: true
})(DataTablePaginatorActions);
