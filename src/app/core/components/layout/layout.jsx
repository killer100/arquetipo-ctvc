import React from "react";
import Toolbar from "./header/toolbar";
import Main from "./main";
import Sidebar from "./sidebar/sidebar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
});

const Layout = ({
  classes,
  children,
  sidebarOpen,
  openSidebar,
  closeSidebar,
  appName,
  menu,
  onClickLogout,
  userName,
}) => (
  <div className={classes.root}>
    <Toolbar
      sidebarOpen={sidebarOpen}
      handleDrawerOpen={openSidebar}
      appName={appName}
      onClickLogout={onClickLogout}
      userName={userName}
    />
    <Sidebar
      open={sidebarOpen}
      handleClose={closeSidebar}
      menu={menu}
      //onMouseLeave={closeSidebar}
      //onMouseEnter={openSidebar}
    />
    <Main>{children}</Main>
  </div>
);

export default withStyles(styles)(Layout);
