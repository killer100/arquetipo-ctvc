import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import LinearProgress from "@material-ui/core/LinearProgress";
import DataTablePaginator from "./paginator";
import DataTableHeader from "./datatable-header";
import DataTableBody from "./datatable-body";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  loaderContainer: {
    height: 5
  },
  floatLeft: {
    float: "left"
  }
});

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calcEmptyRows(pagination) {
    return (
      pagination.pageSize -
      Math.min(
        pagination.pageSize,
        pagination.total - (pagination.page - 1) * pagination.pageSize
      )
    );
  }

  render() {
    const {
      pagination,
      tableDef,
      classes,
      loading,
      emptyMessage,
      error,
      itemsPerPageOptions,
      onLoadData
    } = this.props;

    return (
      <div>
        <div className={classes.tableWrapper}>
          {loading && <LinearProgress />}
          <Table className={classes.table}>
            <DataTableHeader columns={tableDef.columns} />

            <DataTableBody
              pagination={pagination}
              columns={tableDef.columns}
              loading={loading}
              error={error}
              emptyMessage={emptyMessage}
            />
          </Table>
        </div>

        {pagination.total > 0 && (
          <DataTablePaginator
            colspan={tableDef.columns.length}
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            itemsPerPageOptions={itemsPerPageOptions}
            loading={loading}
            onChangePage={page => {
              onLoadData({ page, pageSize: pagination.pageSize });
            }}
            onChangePageSize={e => {
              onLoadData({ page: 1, pageSize: e.target.value });
            }}
          />
        )}
      </div>
    );
  }
}

DataTable.defaultProps = {
  loading: false,
  error: false,
  emptyMessage: "No se encontraron registros",
  itemsPerPageOptions: [5, 10, 15, 20, 25]
};

DataTable.propTypes = {
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  emptyMessage: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  tableDef: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        property: PropTypes.string,
        render: PropTypes.func,
        thStyle: PropTypes.object,
        tdStyle: PropTypes.object
      }).isRequired
    ).isRequired
  })
};

export default withStyles(styles)(DataTable);
