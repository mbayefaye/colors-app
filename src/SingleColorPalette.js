import React, { Component } from "react";
import ColorBox from "./ColorBox";
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shade = this.gatherShade(this.props.palette, this.props.colorId);
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
  render() {
    const colorBoxes = this._shade.map(color => (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color.hex}
        showLink={false}
      />
    ));
    return (
      <div className="Palette">
        <h1>single color palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
