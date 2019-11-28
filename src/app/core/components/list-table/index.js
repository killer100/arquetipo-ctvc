import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import grey from "@material-ui/core/colors/grey";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListTableColumn from "./list-table-column";
import ListTableHeader from "./list-table-header";

const heightRow = 35;

const stylesDefaultColumn = {
  cellNoRecords: {
    textAlign: "center",
    borderBottom: 0
  }
};

const useStyles = makeStyles(theme => ({
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
  rowNoRecords: {
    height: heightRow
  },
  tableRow: {
    height: heightRow
  },
  odd: {
    backgroundColor: grey[200]
  },
  floatLeft: {
    float: "left"
  },
  loaderContainer: {
    height: 5
  }
}));

const ListTableDefaultColumn = withStyles(stylesDefaultColumn)(
  ({ classes, colspan, emptyMessage }) => (
    <TableCell className={classes.cellNoRecords} colSpan={colspan}>
      {emptyMessage}
    </TableCell>
  )
);

const ListTable = ({ tableDef, loading, emptyMessage, items, cellProps }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.loaderContainer}>
        {loading && <LinearProgress />}
      </div>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <ListTableHeader columns={tableDef.columns} cellProps={cellProps} />
          <TableBody>
            {items.length === 0 && (
              <TableRow key={0} className={classes.rowNoRecords}>
                <ListTableDefaultColumn
                  colspan={tableDef.columns.length}
                  emptyMessage={emptyMessage}
                />
              </TableRow>
            )}

            {items.map((item, index) => (
              <TableRow
                key={index}
                className={classnames(
                  index % 2 ? classes.odd : null,
                  classes.tableRow
                )}
              >
                {tableDef.columns.map((col, indexCol) => (
                  <ListTableColumn
                    key={indexCol}
                    colDef={col}
                    item={item}
                    loading={loading}
                    cellProps={cellProps}
                    index={index}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

ListTable.defaultProps = {
  emptyMessage: "No se encontraron registros",
  loading: false,
  cellProps: {},
  items: []
};

ListTable.propTypes = {
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  items: PropTypes.array.isRequired,
  tableDef: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        propertyName: PropTypes.string,
        render: PropTypes.func,
        thStyle: PropTypes.object,
        tdStyle: PropTypes.object
      }).isRequired
    ).isRequired
  }),
  fixedTable: PropTypes.bool,
  fixedTableWidth: PropTypes.number,
  cellProps: PropTypes.object
};

export default ListTable;
