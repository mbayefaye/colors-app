import React, { Component } from "react";
import { Link } from "react-router-dom";
import Minipalette from "./MiniPalette";
class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <Minipalette></Minipalette>
        <h1>React Colors</h1>
        {palettes.map(palette => (
          <p>
            <Minipalette {...palette} />
          </p>
        ))}
      </div>
    );
  }
}

export default PaletteList;
