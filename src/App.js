import React, { Component } from 'react';
import Palette from "./Palette";
import PaletteList from "./PaletteList"
import seedPalette from "./seedPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm"
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles/page.css";

class App extends Component {

  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedPalette };
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  findPalette(id) {
    return this.state.palettes.find(palette => (
      palette.id === id
    ));
  }

  savePalette(newPalette) {
    this.setState(st => ({
      palettes: [...st.palettes, newPalette]
    }),
      this.syncLocalStorage);
  }

  deletePalette(id) {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }),
      this.syncLocalStorage
    );
  }

  render() {
    const { palettes } = this.state;
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <div className="page">
                    <NewPaletteForm
                      savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
                  </div>
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <div className="page" >
                    <PaletteList key="paletteList" palettes={palettes} {...routeProps}
                      deletePalette={this.deletePalette} />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <div className="page">
                    <Palette
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id/:colorId"
                render={routeProps => (
                  <div className="page">
                    <SingleColorPalette
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                      colorId={routeProps.match.params.colorId}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    );
  }
}

export default App;
