import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
const styles = makeStyles(theme => ({
  button: {
    margin: "0 0.5rem"
  }
}));
const PaletteMetaForm = ({
  handleNewPaletteName,
  palettes,
  handleSubmit,
  newPaletteName
}) => {
  const [stage, setStage] = useState("");
  const handleClickOpen = () => {
    setStage("form");
  };

  const classes = styles();
  const handleClose = () => {
    setStage("");
  };

  const showEmojiPicker = () => {
    setStage("emoji");
  };
  const savePalette = emoji => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native
    };
    handleSubmit(newPalette);
    setStage("");
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isPalleteNameUnique", value => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, [newPaletteName, palettes]);
  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={handleClose}>
        <DialogContentText>
          Please Pick for your palette Emoji
        </DialogContentText>
        <Picker onSelect={savePalette} title="Pick a palette Emoji" />
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className={classes.button}
      >
        Save
      </Button>
      <Dialog
        open={stage === "form"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your beautiful palette
            </DialogContentText>

            <TextValidator
              value={newPaletteName}
              fullWidth
              margin="normal"
              onChange={handleNewPaletteName}
              validators={["required", "isPalleteNameUnique"]}
              errorMessages={["Enter palette Name", "  palette already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
