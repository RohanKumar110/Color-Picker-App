import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends Component {

    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.deletePalette(this.props.id);
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick } = this.props;
        return (
            <div className={classes.root} onClick={handleClick}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={this.deletePalette} />
                <div className={classes.colors}>
                    {colors.map(color => (
                        <div
                            key={color.name}
                            className={classes.miniColor}
                            style={{ backgroundColor: color.color }}>
                        </div>
                    ))}
                </div>
                <h5 className={classes.title}>
                    {paletteName}
                    <span className={classes.emoji}>{emoji}</span>
                </h5>

            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);