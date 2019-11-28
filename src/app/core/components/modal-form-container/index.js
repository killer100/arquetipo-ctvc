import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  buttonRetornar: {
    background: '#757575',
    color: theme.palette.common.white
  }
}));

const ModalFormContainer = ({
  open,
  onSubmit,
  onClose,
  onExited,
  title,
  children,
  loading,
  maxWidth,
  fullWidth,
  onEnter,
  disableBackdropClick,
  disableEscapeKeyDown,
  showSubmitButton,
  cancelLabel,
  buttonsSection
}) => {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      onExited={onExited}
      aria-labelledby="form-dialog-title"
      fullWidth={fullWidth}
      onEnter={onEnter}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      {loading && <LinearProgress />}
      <form
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {buttonsSection}
          {showSubmitButton && (
            <Button
              type="submit"
              color="primary"
              disabled={loading}
              variant="contained"
            >
              <Icon>save</Icon> Guardar
            </Button>
          )}
          <Button
            type="button"
            onClick={onClose}
            color="default"
            disabled={loading}
            variant="contained"
            className={showSubmitButton ? '' : classes.buttonRetornar}
          >
            <Icon>input</Icon>{' '}
            {showSubmitButton ? cancelLabel || 'Salir' : 'Retornar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

ModalFormContainer.defaultProps = {
  maxWidth: 'xs',
  fullWidth: false,
  disableBackdropClick: true,
  disableEscapeKeyDown: true,
  showSubmitButton: true
};

export default ModalFormContainer;
