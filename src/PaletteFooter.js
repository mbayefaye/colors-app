import React from "react";

const PaletteFooter = ({ paletteName, emoji }) => {
  return (
    <div>
      <footer className="palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </footer>
    </div>
  );
};

export default PaletteFooter;
