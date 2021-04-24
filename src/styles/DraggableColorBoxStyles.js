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
        color: "rgba(0,0,0,0.5)",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.4s ease-in-out"
    }
}

export default styles;