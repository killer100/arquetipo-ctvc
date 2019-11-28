import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  head: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
	 //color: grey[800],
	 color: '#fff',
	 background: '#616161',
  }
});

export default withStyles(styles)(TableCell);