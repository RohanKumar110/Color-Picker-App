import bg from "./bg.svg";
import sizes from "./sizes";

const styles = {

    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#1e8feb",
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        overflowY: "scroll",
    },
    heading: {
        fontSize: "2rem"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "75%"
        },
        [sizes.down("xs")]: {
            width: "75%"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0",
        color: "white",
        "& a": {
            color: "white",
            marginRight: "40px"
        },
        [sizes.down("xs")]: {
            flexDirection: "column",
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1.4rem"
        }
    }
}

export default styles;