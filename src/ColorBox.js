import React, { Component } from 'react';
import "./ColorBox.css";

class ColorBox extends Component {
    render() {
        const { name, background } = this.props;
        return (
            <div style={{ background }} className="ColorBox">
                <div className="ColorBox-copy-container">
                    <div className="ColorBox-box-content">
                        <span>{name}</span>
                    </div>
                    <button className="ColorBox-copy-button">Copy</button>
                </div>
                <span className="ColorBox-see-more">More</span>
            </div>
        );
    }
}

export default ColorBox;
