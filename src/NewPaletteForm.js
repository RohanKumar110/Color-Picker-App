import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from 'react-sortable-hoc';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PaletteFormNav from "./PaletteFormNav";
import styles from "./styles/NewPaletteFormStyles";

class NewPaletteForm extends Component {

    static defaultProps = {
        maxColors: 20
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentColor: "teal",
            newColorName: "",
            colors: this.props.palettes[0].colors
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.deleteNewColor = this.deleteNewColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.genRandomColor = this.genRandomColor.bind(this);
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
        this.setState({
            [evt.target.name]: evt.target.value
        });
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

    deleteNewColor(colorName) {
        this.setState(st => ({
            colors: st.colors.filter(color => color.name !== colorName)
        }));
    }

    clearPalette() {
        this.setState({ colors: [] });
    }

    genRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        const rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState(st => ({
            colors: [...st.colors, randomColor]
        }));
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    handleSubmit(newPaletteName) {
        const { colors } = this.state;
        const newPalette = {
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            emoji: "emoji",
            paletteName: newPaletteName,
            colors: colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, newColorName, colors, currentColor } = this.state;
        const paletteIsFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    classes={classes}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
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
                        <Button variant="contained" color="secondary" onClick={this.clearPalette}>
                            CLEAR PALETTE
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={paletteIsFull}
                            onClick={this.genRandomColor}>
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker color={this.state.currentColor}
                        onChangeComplete={this.updateCurrentColor} />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            name="newColorName"
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
                            disabled={paletteIsFull}
                            style={{ backgroundColor: paletteIsFull ? "silver" : currentColor }}>
                            {paletteIsFull ? "Palette Full" : "Add Color"}
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}>
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                        colors={colors}
                        deleteNewColor={this.deleteNewColor} />
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
