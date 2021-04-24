import React from 'react'
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc"
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement((props) => {

    const { name, classes, handleClick } = props;
    return (
        <div className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <span>
                    <DeleteIcon
                        onClick={handleClick}
                        className={classes.deleteIcon}
                    />
                </span>
            </div>
        </div>
    );
})

export default withStyles(styles)(DraggableColorBox);