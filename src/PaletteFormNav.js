import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles/PaletteFormNavStyles";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import { Button } from "@material-ui/core";
import PaletteMetaForm from "./PaletteMetaForm";
import PaletteIcon from "@material-ui/icons/Palette";

//styles

const PaletteFormNav = ({ handleDrawerOpen, palettes, handleSubmit, open }) => {
  const [newPaletteName, setNewPaletteName] = useState("");
  const classes = styles();

  function handleNewPaletteName(e) {
    setNewPaletteName(e.target.value);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <PaletteIcon color="secondary" />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.NavBtns}>
          <PaletteMetaForm
            handleNewPaletteName={handleNewPaletteName}
            palettes={palettes}
            handleSubmit={handleSubmit}
            newPaletteName={newPaletteName}
          />
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
};

export default PaletteFormNav;
