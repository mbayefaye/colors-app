import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
      open: true
    });
    this.props.handleChange(e.target.value);
  }

  closeSnackBar() {
    this.setState({
      open: false
    });
  }

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">ReactColorPicker</Link>
        </div>
        <div className="slider-container">
          <span>Level:{level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select onChange={this.handleFormatChange} value={format}>
            <MenuItem value="hex">HEX - #fffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,0.1) </MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span>Format changed to {format.toLocaleUpperCase()}!</span>}
          ContentProps={{ "aria-describedby": "message-id" }}
          onClose={this.closeSnackBar}
          action={[
            <IconButton color="inherit" key="close" aria-label="close">
              <CloseIcon onClick={this.closeSnackBar} />
            </IconButton>
          ]}
        ></Snackbar>
      </header>
    );
  }
}

export default Navbar;
