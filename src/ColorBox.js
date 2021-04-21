import "./ColorBox.css";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from "@material-ui/styles";

class ColorBox extends Component {

    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }

    render() {
        const { name, background, showingFullPalette, moreUrl, classes } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.colorBox}>
                    <div className={`ColorBox-copy-overlay ${copied && "show"}`}
                        style={{ background }} />
                    <div className={`ColorBox-copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="ColorBox-copy-container">
                        <div className="ColorBox-box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette &&
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

const style = {

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
    }
}

export default withStyles(style)(ColorBox);