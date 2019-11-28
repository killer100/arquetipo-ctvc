import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Moment from '../moment';
import TableCell from '@material-ui/core/TableCell';

const styles = {
  padding: {
    paddingRight: 4
  }
};

const getProperty = function (obj, path) {
  return path.split(/(\[|\]|\.)/).reduce(function (x, y) {
    return '[].'.indexOf(y) > -1 ? x : x === Object(x) && y in x ? x[y] : undefined;
  }, obj);
};

const DataTableColumn = ({ classes, colDefinition, item, loading }) => {
  let content = null;

  if (typeof colDefinition.render === 'function') content = colDefinition.render(item, loading);

  else {
    const propValue = getProperty(item, colDefinition.property);
    content = colDefinition.isDate ? (
      <Moment date={propValue} format="DD/MM/YYYY" />
    ) : (
        propValue
      );
  }

  return <TableCell scope="row" className={classes.padding}>{content}</TableCell>;

};

export default withStyles(styles)(DataTableColumn);