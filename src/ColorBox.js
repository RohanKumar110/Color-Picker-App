import "./ColorBox.css";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
        const { name, background } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className="ColorBox">
                    <div className={`ColorBox-copy-overlay ${copied && "show"}`}
                        style={{ background }} />
                    <div className={`ColorBox-copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="ColorBox-copy-container">
                        <div className="ColorBox-box-content">
                            <span>{name}</span>
                        </div>
                        <button className="ColorBox-copy-button">Copy</button>
                    </div>
                    <Link to="/" onClick={e => e.stopPropagation()}>
                        <span className="ColorBox-see-more">More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;