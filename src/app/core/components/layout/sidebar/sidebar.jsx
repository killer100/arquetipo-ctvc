import React, { useState } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import img from "assets/img/logo-sispad.png";

export const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  imgLogo: {
	  width: '80%'
  },
});

const MenuItemParent = ({ item, drawerIsOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={item.text} />
        <Icon>expand_more</Icon>
      </ListItem>
      <Collapse in={open && drawerIsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((childrenItem, index) => (
            <MenuItem item={childrenItem} key={index} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

const MenuItemLink = ({ item }) => (
  <ListItem button component={Link} to={item.url}>
    <ListItemIcon>
      <Icon>{item.icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={item.text} />
  </ListItem>
);

const MenuItem = ({ item, drawerIsOpen }) => (
  <>
    {!item.children && <MenuItemLink item={item} />}
    {item.children && (
      <MenuItemParent item={item} drawerIsOpen={drawerIsOpen} />
    )}
  </>
);

const Sidebar = ({
  classes,
  theme,
  open,
  handleClose,
  menu,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Drawer
    //onMouseEnter={onMouseEnter}
    //onMouseLeave={onMouseLeave}
    variant="permanent"
    className={classNames(classes.drawer, {
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    })}
    classes={{
      paper: classNames({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      }),
    }}
    open={open}
  >
    <div className={classes.toolbar}>
      <img className={classes.imgLogo} src={img} />
      <IconButton onClick={handleClose}>
        {theme.direction === "rtl" ? (
          <Icon>chevron_right</Icon>
        ) : (
          <Icon>chevron_left</Icon>
        )}
      </IconButton>
    </div>
    <Divider />
    <List>
      {menu.map((item, index) => (
        <MenuItem item={item} key={index} drawerIsOpen={open} />
      ))}
    </List>
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(Sidebar);
