import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import CustomSnackBarContent from './custom-snackbar-content'

const Toast = ({ variant, message, ...props }) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    props.reject(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <CustomSnackBarContent
        onClose={handleClose}
        variant={variant}
        message={<span id='message-id'>{message}</span>}
      />
    </Snackbar>
  )
}

Toast.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  //onClose: PropTypes.func.isRequired
}

export default function (message, variant) {
  const wrapper = document.body.appendChild(document.createElement('div'))

  const options = { message, variant }

  const promise = new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        // <MuiThemeProvider theme={theme}>
        <Toast
          dispose={dispose}
          resolve={resolve}
          reject={reject}
          {...options}
        />,
        // </MuiThemeProvider>,
        wrapper
      )
    } catch (e) {
      console.error(e)
      throw e
    }
  })

  function dispose () {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(wrapper)
      setTimeout(() => document.body.removeChild(wrapper))
    }, 0)
  }
  // You can pass whatever you want to the component. These arguments will be your Component's props

  return promise.then(
    result => {
      dispose()
      return result
    },
    result => {
      dispose()
      // return Promise.reject(result);
      return result
    }
  )
}
