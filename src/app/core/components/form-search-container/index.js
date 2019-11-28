import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	buttonsContainer: {
		textAlign: 'center'
	}
}));

const FormSearchContainer = ({ onSearch, onClear, children }) => {

	const classes = useStyles();

	return <form
		noValidate
		autoComplete="off"
		onSubmit={(e) => { e.preventDefault(); onSearch() }}
	>

		<Grid container spacing={1} alignItems="center">
			{children}
			<Grid item xs={12} className={classes.buttonsContainer}>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={classes.button}>
					<Icon>search</Icon>
					Buscar
				 </Button>

				<Button
					type="button"
					variant="contained"
					className={classes.button}
					onClick={onClear}>
					<Icon>clear_all</Icon>
					Limpiar
				</Button>

			</Grid>
		</Grid>
	</form>
}

export default FormSearchContainer; 