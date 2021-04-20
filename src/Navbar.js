import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import "./Navbar.css";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { colorFormat: "hex" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ colorFormat: evt.target.value },
            () => this.props.changeColorFormat(this.state.colorFormat));
    }

    render() {
        const { level, changeLevel } = this.props;
        const { colorFormat } = this.state;

        return (
            <header className="Navbar">
                <div className="Navbar-logo">ColorPicker</div>
                <div className="Navbar-slider-container">
                    <span>Level: {level}</span>
                    <div className="Navbar-slider">
                        <Slider
                            min={100}
                            defaultValue={level}
                            step={100} max={900}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className="Navbar-select-container">
                    <Select value={colorFormat} onChange={this.handleChange}>
                        <MenuItem value="hex" selected>Hex - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
                    </Select>
                </div>
            </header>
        );
    }
}

export default Navbar;