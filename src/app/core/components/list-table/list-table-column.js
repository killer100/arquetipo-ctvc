import React from "react";
import TableCell from "@material-ui/core/TableCell";
import Moment from "../moment";
const getProperty = function(obj, path) {
  return path.split(/(\[|\]|\.)/).reduce(function(x, y) {
    return "[].".indexOf(y) > -1
      ? x
      : x === Object(x) && y in x
      ? x[y]
      : undefined;
  }, obj);
};

const ListTableColumn = ({
  colDef: colDefinition,
  item,
  loading,
  cellProps,
  index
}) => {
  let content = null;

  if (typeof colDefinition.render === "function")
    content = colDefinition.render(item, loading, index);
  else {
    const propValue = getProperty(item, colDefinition.property);
    content = colDefinition.isDate ? (
      <Moment date={propValue} format="DD/MM/YYYY" />
    ) : (
      propValue
    );
  }

  return (
    <TableCell scope="row" style={colDefinition.tdStyle} {...cellProps}>
      {content}
    </TableCell>
  );
};

export default ListTableColumn;
