import sizes from "./sizes";

const styles = {
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex- start",
        height: "6vh",
        [sizes.down("xs")]: {
            padding: "20px 10px"
        }
    },
    navbarLogo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "Roboto,sans-serif",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "#000000",
        },
        [sizes.down("xs")]: {
            display: "none"
        }
    },
    colorLevel: {
        fontWeight: "500"
    },
    slider: {
        width: "350px",
        margin: "0 25px",
        display: "inline-block",
        cursor: "pointer",
        "& .rc-slider-track": {
            backgroundColor: "transparent"
        },
        "& .rc-slider-rail": {
            height: "8px"
        },
        "& .rc-slider-handle, .rc-slider-handle:hover,.rc-slider-handle:active,.rc-slider-handle:focus": {
            backgroundColor: "green",
            border: "2px solid green",
            outline: "none",
            boxShadow: "none",
            width: "13px",
            height: "13px",
            marginLeft: "-7px",
            marginTop: "-3px"
        },
        [sizes.down("sm")]: {
            width: "150px"
        },
        [sizes.down("xs")]: {
            margin: "0"
        }
    },
    selectContainer: {
        marginLeft: "auto",
        marginRight: "20px"
    }
}

export default styles;