import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from "./styles/NewPaletteFormStyles";

class NewPaletteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentColor: "teal",
            newColorName: "",
            colors: [{ name: "blue", color: "#004480" }]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.state.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    }

    handleDrawerClose() {
        this.setState({ open: false });
    }

    handleChange(evt) {
        this.setState({ newColorName: evt.target.value });
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    addNewColor() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName,
        }
        this.setState({ colors: [...this.state.colors, newColor] });
        this.setState({ newColorName: "", currentColor: "" });
    }

    handleSubmit() {
        let newName = "New Palette";
        const newPalette = {
            id: newName.toLowerCase().replace(/ /g, "-"),
            emoji: "emoji",
            paletteName: newName,
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;
        const { open, colors, newColorName } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}>
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create a Palette
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary">
                            Go Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}>
                            Save Palette
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant="h4">Design Your Palette</Typography>
                    <div>
                        <Button variant="contained" color="secondary">CLEAR PALETTE</Button>
                        <Button variant="contained" color="primary">Random Color</Button>
                    </div>
                    <ChromePicker color={this.state.currentColor}
                        onChangeComplete={this.updateCurrentColor} />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            name="colorName"
                            value={newColorName}
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a color name', 'Color name must be unique',
                                'Color already used']}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ backgroundColor: this.state.currentColor }}>
                            Add Color
                    </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}>
                    <div className={classes.drawerHeader} />
                    {colors.map(color => (
                        <DraggableColorBox
                            color={color.color}
                            name={color.name} />
                    ))}
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
