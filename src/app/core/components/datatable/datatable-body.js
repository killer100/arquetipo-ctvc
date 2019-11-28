import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import grey from '@material-ui/core/colors/grey'
import DataTableColumn from './datatable-column'
import DataTableDefaultColumn from './datatable-default-column'

const heightRow = 35

const styles = {
  odd: {
    backgroundColor: grey[200]
  },
  tableRow: {
    height: heightRow
  },
  hide: {
    display: 'none'
  }
}

const EmptyRows = ({ emptyRows, colspan }) => (
  <TableRow style={{ height: heightRow * emptyRows }}>
    <TableCell colSpan={colspan} />
  </TableRow>
)

const DataTableBody = ({
  classes,
  pagination,
  columns,
  loading,
  error,
  emptyMessage
}) => {
  const emptyRows =
    pagination.pageSize -
    Math.min(
      pagination.pageSize,
      pagination.total - (pagination.page - 1) * pagination.pageSize
    )
  // const emptyRows = pagination.pageSize - 1;

  return (
    <TableBody>
      {pagination.total === 0 ? (
        <TableRow>
          <DataTableDefaultColumn
            colspan={columns.length}
            loading={loading}
            error={error}
            emptyMessage={emptyMessage}
          />
        </TableRow>
      ) : (
        pagination.items.map((item, i) => (
          <TableRow
            key={i}
            className={classnames(i % 2 ? classes.odd : null, classes.tableRow)}
          >
            {columns.map((col, index) => (
              <DataTableColumn
                key={index}
                colDefinition={col}
                item={item}
                loading={loading}
              />
            ))}
          </TableRow>
        ))
      )}

      {emptyRows > 0 && (
        <EmptyRows emptyRows={emptyRows} colspan={columns.length} />
      )}
    </TableBody>
  )
}

export default withStyles(styles)(DataTableBody)
