import React, { Component } from 'react';
import Palette from "./Palette";
import Page from "./Page";
import PaletteList from "./PaletteList"
import seedPalette from "./seedPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm"
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <Page>
                    <NewPaletteForm
                      savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
                  </Page>
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Page >
                    <PaletteList key="paletteList" palettes={palettes} {...routeProps}
                      deletePalette={this.deletePalette} />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <Page>
                    <Palette
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id/:colorId"
                render={routeProps => (
                  <Page>
                    <SingleColorPalette
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )}
              />
              <Route render={routeProps => (
                <Page >
                  <PaletteList key="paletteList" palettes={palettes} {...routeProps}
                    deletePalette={this.deletePalette} />
                </Page>
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
