import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
    padding: 2
  }
}))

const GridActionButtons = ({
  item,
  disabled,
  onClickShow,
  onClickEdit,
  onClickDelete
}) => {
  const classes = useStyles()

  return (
    <>
      <IconButton
        aria-label='Show'
        disabled={disabled}
        className={classes.margin}
        onClick={() => onClickShow(item.idAbogado)}
      >
        <Icon fontSize='small'>remove_red_eye</Icon>
      </IconButton>

          {/*<IconButton
        aria-label='Edit'
        disabled={disabled}
        className={classes.margin}
        onClick={() => onClickEdit(item.idAbogado)}
      >
        <Icon fontSize='small'>edit</Icon>
      </IconButton>*/}

      <IconButton
        aria-label='Delete'
        disabled={disabled}
        className={classes.margin}
        onClick={() => onClickDelete(item.idAbogado)}
      >
        <Icon fontSize='small'>delete</Icon>
      </IconButton>
    </>
  )
}

export default GridActionButtons
