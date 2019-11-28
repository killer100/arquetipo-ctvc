import React, { useState } from "react";
import "./App.css";
import AppRouting from "./route-config";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "app/core/components/layout/layout";
import { AppConfig } from "./core/config/app.config";

const { urlBaseProject, userName } = AppConfig;

const initialState = {
  sidebarOpen: true
};

function App({ classes }) {
  const [state, setState] = useState(initialState);

  return (
    <Router>
		<Layout
		  userName={userName}
		  onClickLogout={() => window.location.href=`${urlBaseProject}/api/home/logoff`}
        appName="SISPAD"
        sidebarOpen={state.sidebarOpen}
        openSidebar={() => {
          setState({ ...state, sidebarOpen: true });
        }}
        closeSidebar={() => {
          setState({ ...state, sidebarOpen: false });
        }}
        menu={[
          { text: "Inicio", url: urlBaseProject, icon: "home" },
          {
            text: "Mantenimiento",
            icon: "settings",
            children: [
              {
                text: "Abogados",
                url: `${urlBaseProject}/datos-maestros/abogados`
                // icon: "accessibility"
              },
              {
                text: "Normas",
                url: `${urlBaseProject}/datos-maestros/normas`
                // icon: "list"
              }
            ]
          },
          {
            text: "Investigacion",
            icon: "pageview",
            children: [
              {
                text: "Bandeja Principal",
                url: `${urlBaseProject}/investigacion`
                // icon: "inbox"
              }
            ]
          }
        ]}
      >
        <AppRouting />
      </Layout>
    </Router>
  );
}

export default App;
