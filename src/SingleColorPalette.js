import React, { Component } from 'react';
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";

class SingleColorPalette extends Component {

    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: "hex" };
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    gatherShades(palette, colorFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorFilterBy)
            )
        }
        return shades.slice(1);
    }

    changeColorFormat(colorFormat) {
        this.setState({ format: colorFormat });
    }

    render() {
        const { format } = this.state;
        const { classes } = this.props;
        const { paletteName, emoji, id } = this.props.palette;

        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name}
                background={color[format]}
                showingFullPalette={false} />
        ));
        return (
            <div className={classes.palette}>
                <Navbar
                    changeColorFormat={this.changeColorFormat} showingAllColors={false} />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

const styles = {
    palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    paletteColors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-4px",
        opacity: "1",
        background: "#000000",
        "& a": {
            background: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            fontSize: "1rem",
            lineHeight: "30px",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
        }
    }

}

export default withStyles(styles)(SingleColorPalette);