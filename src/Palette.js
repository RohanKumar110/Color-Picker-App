import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";

class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    changeColorFormat(colorFormat) {
        this.setState({ format: colorFormat });
    }

    render() {
        const { classes } = this.props;
        const { level, format } = this.state;
        const { id, paletteName, emoji, colors } = this.props.palette;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                key={color.id}
                name={color.name}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette />
        ));
        return (
            <div className={classes.palette}>
                <Navbar level={level} changeLevel={this.changeLevel}
                    changeColorFormat={this.changeColorFormat}
                    showingAllColors
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);