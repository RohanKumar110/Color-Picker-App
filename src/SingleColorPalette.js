import React, { Component } from 'react';
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import { Link } from 'react-router-dom';

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
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name}
                background={color[format]}
                showingFullPalette={false} />
        ));
        return (
            <div className="SingleColorPalette Palette">
                <Navbar
                    changeColorFormat={this.changeColorFormat} showingAllColors={false} />
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default SingleColorPalette;