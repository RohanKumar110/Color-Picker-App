const styles = {
    palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    paletteColors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-4px",
        opacity: "1",
        background: "#000000",
        "& a": {
            background: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
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
            fontSize: "1rem",
            lineHeight: "30px",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
        }
    }
}

export default styles;