import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  PaletteColors: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100%",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50%",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none"
    }
  }
};
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shade = this.gatherShade(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShade(palette, colorToFilterBy) {
    let shades = [];
    let Allcolors = palette.colors;
    for (let key in Allcolors) {
      shades = shades.concat(
        Allcolors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    //return all shades of given Color$
    return shades.slice(1);
  }

  changeFormat(value) {
    this.setState({
      format: value
    });
  }
  render() {
    const { format } = this.state;
    const { emoji, paletteName, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shade.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          handleChange={this.changeFormat}
          showingAllColors={false}
        ></Navbar>
        <div className={classes.PaletteColors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
