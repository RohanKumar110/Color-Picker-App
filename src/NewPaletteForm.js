import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";

class NewPaletteForm extends Component {

    static defaultProps = {
        maxColors: 20
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            colors: this.props.palettes[0].colors
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.deleteNewColor = this.deleteNewColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.genRandomColor = this.genRandomColor.bind(this);
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

    addNewColor(newColor) {
        this.setState({ colors: [...this.state.colors, newColor] });
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

    handleSubmit(newPaletteName, newEmoji) {

        const newPalette = {
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            emoji: newEmoji,
            paletteName: newPaletteName,
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
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
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttonContainer}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.clearPalette}>
                                CLEAR PALETTE
                        </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={paletteIsFull}
                                className={classes.button}
                                onClick={this.genRandomColor}>
                                Random Color
                        </Button>
                        </div>
                        <ColorPickerForm
                            colors={colors}
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor} />
                    </div>
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
                        distance={20}
                        deleteNewColor={this.deleteNewColor} />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
