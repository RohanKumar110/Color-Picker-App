import chroma from "chroma-js";
import sizes from "./sizes";

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
        marginBottom: "-6px",
        "&:hover svg": {
            color: "#ffffff",
            transform: "scale(1.3)"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
        }
    },
    boxContent: {
        position: "absolute",
        padding: "3px",
        width: "100%",
        left: "0",
        bottom: "0",
        letterSpacing: "1px",
        fontSize: "12px",
        display: "flex",
        color: props => chroma(props.color).luminance() <= 0.08 ? "white" : "rgba(0,0,0,0.6)",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.4s ease-in-out"
    }
}

export default styles;