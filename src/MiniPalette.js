import React, { PureComponent } from "react";
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDelete(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }

    handleClick() {
        this.props.handleClick(this.props.id);
    }

    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={this.handleDelete} />
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