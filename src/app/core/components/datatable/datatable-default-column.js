import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const styles = {
  cellNoRecords: {
    textAlign: 'center',
    borderBottom: 0
  }
};

const DataTableDefaultColumn = ({ classes, colspan, loading, error, emptyMessage }) => (
  <TableCell className={classes.cellNoRecords} colSpan={colspan}>
    {loading
      ? 'Cargando resultados...'
      : error
        ? 'Ocurrió un error al cargar los datos'
        : emptyMessage}
  </TableCell>
);

export default withStyles(styles)(DataTableDefaultColumn);