import React, { Component } from "react";
import { Link } from "react-router-dom";
import Minipalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import {
  DialogTitle,
  Avatar,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import CheckIcon from "@material-ui/icons/Check";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.gotoPalette = this.gotoPalette.bind(this);
  }
  openDialog(id) {
    this.setState({
      openDeleteDialog: true,
      deletingId: id
    });
  }
  closeDialog() {
    this.setState({
      openDeleteDialog: false,
      deletingId: ""
    });
  }
  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  gotoPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <Minipalette
                  {...palette}
                  key={palette.id}
                  id={palette.id}
                  gotoPalette={this.gotoPalette}
                  openDialog={this.openDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete this Palette
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Delete" />
              </ListItem>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: red[100], color: red[600] }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItem>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
