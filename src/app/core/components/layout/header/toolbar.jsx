import React from "react";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { drawerWidth } from "../sidebar/sidebar";
import img from "assets/img/logo-cunamas.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  noPaddingLeft: {
    paddingLeft: 0,
  },
});

const ToolbarComponent = ({
  classes,
  sidebarOpen,
  handleDrawerOpen,
  appName,
  onClickLogout,
  userName,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClickUserMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorEl(null);
  }
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: sidebarOpen,
        })}
      >
        <Toolbar
          className={classNames({ [classes.noPaddingLeft]: !sidebarOpen })}
        >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: sidebarOpen,
            })}
          >
            <Icon>menu</Icon>
          </IconButton>
          <img src={img} alt={appName} />
          {/* <Typography className={classes.title} variant="h6" color="inherit" noWrap>
					<img src={img} alt={appName}/>					
				</Typography> */}
          <div className={classes.grow} />
          {/*<div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Icon>search</Icon>
                    </div>
                    <InputBase
                        placeholder="Buscar..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>*/}
          <IconButton
            aria-controls="user-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickUserMenu}
          >
            <Icon>account_circle</Icon>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>{userName}</MenuItem>
            <MenuItem onClick={onClickLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

ToolbarComponent.defaultProps = {
  userName: "-",
};

export default withStyles(styles)(ToolbarComponent);
