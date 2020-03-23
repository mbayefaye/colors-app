import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { arrayMove } from "react-sortable-hoc";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import useStyles from "./styles/NewPaletteFormStyle";
import seedColors from "./seedColors";
const NewPaleteForm = ({ savePalette, history, palettes, maxColors }) => {
  const [currentColor, setColor] = useState("");
  const [newName, setUniqueColor] = useState("");
  const [colors, setColors] = useState(seedColors[0].colors);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const clearPalette = () => {
    setColors([]);
  };
  const randomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicated = true;
    while (isDuplicated) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicated = setColors(
        colors.some(color => color.name === randomColor.name)
      );
    }
    setColors([...colors, randomColor]);
  };

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function addNewColor() {
    const newColor = {
      color: currentColor,
      name: newName
    };

    setColors([...colors, newColor]);
    setUniqueColor("");
  }

  function updateCurrentColor(newColor) {
    setColor(newColor.hex);
  }

  function handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;

    savePalette(newPalette);
    //redirect to home page
    history.push("/");
  }
  function handleChange(e) {
    setUniqueColor(e.target.value);
  }
  const removeColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  //palette is full
  const paletteIsFull = colors.length >= maxColors;
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        classes={classes}
        palettes={palettes}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => clearPalette()}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => randomColor()}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            currentColor={currentColor}
            newName={newName}
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            updateCurrentColor={updateCurrentColor}
            handleChange={handleChange}
            palettes={palettes}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
};
NewPaleteForm.defaultProps = {
  maxColors: 20
};

export default NewPaleteForm;
