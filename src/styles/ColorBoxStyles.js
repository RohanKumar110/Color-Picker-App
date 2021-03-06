import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
    colorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: "1",
            transition: "0.4s ease-in-out"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => (props.showingFullPalette ? "20%" : "33.3333%")
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => (props.showingFullPalette ? "10%" : "20%")
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => (props.showingFullPalette ? "5%" : "10%")
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "rgba(0,0,0,0.6)"
    },
    seeMore: {
        color: props =>
            chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.6)" : "white",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        bottom: "0",
        right: "0",
        padding: "2px",
        border: "none",
        width: "60px",
        lineHeight: "30px",
        height: "30px",
        textAlign: "center"
    },
    copyButton: {
        color: props =>
            chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        opacity: "0",
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
        background: "rgba(255, 255, 255, 0.2)",
        fontSize: "1rem",
        lineHeight: "30px",
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
    },
    boxContent: {
        position: "absolute",
        padding: "3px",
        width: "100%",
        left: "0",
        bottom: "0",
        color: "#000000",
        letterSpacing: "1px",
        fontSize: "12px",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.8s ease-in -out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        zIndex: "10",
        transform: "scale(50)",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "#ffffff",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px #000000",
            background: "rgba(0, 0, 0, 0.1)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            [sizes.down("xs")]: {
                fontSize: "3rem"
            }
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMessage: {
        opacity: "1",
        zIndex: "25",
        transform: "scale(1)",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.4s"
    }
}

export default styles;