import {
	createMuiTheme
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500]
		}, // Purple and green play nicely together.
		secondary: {
			main: grey[50]
		}, // This is just green.A700 as hex.
		text: {
			disabled: '#444'
		}

	},

	typography: {

		// In Japanese the characters are usually larger.

		fontSize: 13

	}

});