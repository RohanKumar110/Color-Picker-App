import MiniPalette from "./MiniPalette";
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";


class PaletteList extends Component {

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>UI Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                            <div>
                                <MiniPalette
                                    key={palette.id}
                                    {...palette}
                                    deletePalette={deletePalette}
                                    handleClick={() => this.goToPalette(palette.id)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);