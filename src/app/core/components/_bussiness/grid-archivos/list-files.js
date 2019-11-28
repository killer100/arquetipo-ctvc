import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

function formatBytes(bytes, decimals) {
  if (bytes == 0) {
    return "0 Byte";
  }
  var k = 1024; //Or 1 kilo = 1000
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
}

/**
 *
 * @param {{files: any[]}} param0
 */
const ListFiles = ({ files, icon, onRemove, disabled }) => {
  return (
    <>
      <div>Archivos a cargar: </div>
      <List>
        {files.map((x, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <Icon>{icon}</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={x.name} secondary={formatBytes(x.size, 2)} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Delete"
                onClick={onRemove(i)}
                disabled={disabled}
              >
                <Icon>delete</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListFiles;
