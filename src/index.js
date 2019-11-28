import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { configAxios } from "app/core/config/axios.config";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./app/core/config/theme";
import moment from "moment";
import "moment/locale/es";

configAxios();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'es'}>
      <App />
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
