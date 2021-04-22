import React from 'react'
import { withStyles } from "@material-ui/styles";

const styles = {
    root: {
        width: "20%",
        height: "25%",
        color: "white",
        backgroundColor: props => props.color,
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-4px",
    }
}

function DraggableColorBox(props) {

    const { color, classes } = props;
    return (
        <div className={classes.root}>
            {color}
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);