import React from "react";
import { SortableElement } from "react-sortable-hoc";
import sizes from "./styles/size";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: props =>
      chroma(props.color).luminance() <= 0.08
        ? "rgba(255,255,255,0.8)"
        : "rgba(255,255,255,0.6)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
    cursor: "pointer"
  }
};
const DraggableColorBox = SortableElement(
  ({ color, classes, name, handleClick }) => {
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
          <span> {name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DraggableColorBox);
