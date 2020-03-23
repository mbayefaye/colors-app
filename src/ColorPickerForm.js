import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styles from "./styles/ColorPickerForm";
const ColorPickerForm = ({
  currentColor,
  paletteIsFull,
  addNewColor,
  updateCurrentColor,
  handleChange,
  newName,
  colors,
  palettes
}) => {
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return colors.every(
        color => color.name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", value => {
      return colors.every(color => color.color !== currentColor);
    });
  }, [colors, currentColor, palettes]);
  const classes = styles();

  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          placeholder="Color Name"
          variant="filled"
          value={newName}
          margin="normal"
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already used"
          ]}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.addColor}
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
        >
          {paletteIsFull ? "palette full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
