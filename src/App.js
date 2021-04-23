import React, { Component } from 'react';
import Palette from "./Palette";
import PaletteList from "./PaletteList"
import seedPalette from "./seedPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm"
import SingleColorPalette from './SingleColorPalette';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { palettes: seedPalette };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(palette => (
      palette.id === id
    ));
  }

  savePalette(newPalette) {
    this.setState(st => ({
      palettes: [...st.palettes, newPalette]
    }));
  }

  render() {
    const { palettes } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={routeProps =>
              <NewPaletteForm
                savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />}
          />
          <Route
            exact
            path="/"
            render={routeProps =>
              <PaletteList key="paletteList" palettes={palettes} {...routeProps} />} />
          <Route
            exact
            path="/palette/:id"
            render={routeProps => (
              <Palette
                palette={generatePalette(this.findPalette(routeProps.match.params.id))}
              />
            )}
          />
          <Route
            exact
            path="/palette/:id/:colorId"
            render={routeProps => (
              <SingleColorPalette
                palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                colorId={routeProps.match.params.colorId}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
