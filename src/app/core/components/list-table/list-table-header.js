import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const ListTableHeaderColumn = withStyles(theme => ({
  head: {
    //fontSize: theme.typography.fontSize + 2,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
}))(TableCell);

const ListTableHeader = ({ columns, cellProps }) => (
  <TableHead>
    <TableRow>
      {columns.map(
        (column, index) => (
          <ListTableHeaderColumn
            component="th"
            scope="row"
            key={index}
            style={column.thStyle}
            {...cellProps}
          >
            {column.label}
          </ListTableHeaderColumn>
        ),
        this
      )}
    </TableRow>
  </TableHead>
);

export default ListTableHeader;
