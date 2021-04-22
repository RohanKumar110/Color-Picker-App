const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        margin: "0 auto",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        margin: "10px 0",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%",

    }
}

export default styles;