import React from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        padding: "0.5rem",
        postion: "relative",
        overflow: "hidden",
        border: "1px solid black",
        cursor: "pointer"
    },
    colors: {
        backgroundColor: "#ffffff",
        height: "130px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "0.8rem",
        postion: "relative"
    },
    emoji: {
        fontSize: "1rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        postion: "relative",
        marginBottom: "-3.5px",
    }
}

function MiniPalette(props) {

    const { classes, paletteName, emoji, colors, handleClick } = props;
    return (
        <div className={classes.root} onClick={handleClick}>
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

export default withStyles(styles)(MiniPalette);