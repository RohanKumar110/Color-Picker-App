import React, { Component } from 'react';
import Palette from "./Palette";
import PaletteList from "./PaletteList"
import seedPalette from "./seedPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm"
import './App.css';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {

  findPalette(id) {
    return seedPalette.find(palette => (
      palette.id === id
    ));
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={() => <NewPaletteForm />}
          />
          <Route
            exact
            path="/"
            render={routeProps =>
              <PaletteList key="paletteList" palettes={seedPalette} {...routeProps} />} />
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
