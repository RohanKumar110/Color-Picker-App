import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import 'rc-slider/assets/index.css';
import { Link } from "react-router-dom";
import styles from "./styles/NavbarStyles";
import { withStyles } from "@material-ui/styles";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { colorFormat: "hex", open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(evt) {
        this.setState({ colorFormat: evt.target.value, open: true },
            () => this.props.changeColorFormat(this.state.colorFormat));
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel, showingAllColors, classes } = this.props;
        const { colorFormat } = this.state;

        return (
            <header className={classes.navbar}>
                <div className={classes.navbarLogo}>
                    <Link to="/">ColorPicker</Link>
                </div>
                {showingAllColors &&
                    <div>
                        <span className={classes.colorLevel}>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                min={100}
                                defaultValue={level}
                                step={100} max={900}
                                onAfterChange={changeLevel} />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={colorFormat} onChange={this.handleFormatChange}>
                        <MenuItem value="hex" selected>Hex - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
                    </Select>
                </div>
                <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    key="Snackbar"
                    autoHideDuration={3000}
                    message={<span id="message-id">Format Changed! to {colorFormat.toUpperCase()}</span>}
                    ContentProps={{ "aria-describedby": "message-id" }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color="inherit" key="close">
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);