import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TablePagination from '@material-ui/core/TablePagination';
import DataTablePaginatorActions from './datatable-paginator-actions';


const DataTablePaginator = ({
  page,
  pageSize,
  total,
  colspan,
  itemsPerPageOptions,
  loading,
  onChangePage,
  onChangePageSize
}) => (
    <TablePagination
      component="div"
      labelRowsPerPage="Filas por página"
      labelDisplayedRows={({ from, to, count }) =>
        `Filas del ${from} al ${to} de un total de ${count}`
      }
      colSpan={colspan}
      count={total}
      rowsPerPage={pageSize}
      page={page - 1}
      onChangePage={page => {
        onChangePage(page + 1);
      }}
      onChangeRowsPerPage={onChangePageSize}
      ActionsComponent={DataTablePaginatorActions}
      nextIconButtonProps={{ disabled: loading }}
      rowsPerPageOptions={itemsPerPageOptions}
    />
  );

export default DataTablePaginator;