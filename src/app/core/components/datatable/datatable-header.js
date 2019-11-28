import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DataTableHeaderColumn from './datatable-header-column';

const DataTableHeader = ({ columns }) => (
  <TableHead>
    <TableRow>
      {columns.map(
        (column, index) => (
          <DataTableHeaderColumn
            component="th"
            scope="row"
            key={index}
            style={column.thStyle}
          >
            {column.label}
          </DataTableHeaderColumn>
        ),
        this
      )}
    </TableRow>
  </TableHead>
);

export default DataTableHeader;