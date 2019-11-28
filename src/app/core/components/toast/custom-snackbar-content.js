import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '@material-ui/core/Icon'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: () => <Icon>check_circle</Icon>, // CheckCircleIcon,
  warning: () => <Icon>warning</Icon>, // WarningIcon,
  error: () => <Icon>error</Icon>, // ErrorIcon,
  info: () => <Icon>info</Icon> // InfoIcon
}

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
})

function CustomSnackBarContent (props) {
  const { classes, className, message, onClose, variant, ...other } = props
  const ToastIcon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <ToastIcon
            className={classNames(classes.icon, classes.iconVariant)}
          />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}
        >
          <Icon className={classes.icon}>close</Icon>
        </IconButton>
      ]}
      {...other}
    />
  )
}

CustomSnackBarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

export default withStyles(styles)(CustomSnackBarContent)
