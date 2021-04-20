import React, { Component } from 'react';
import Palette from "./Palette";
import seedPalette from "./seedPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import './App.css';

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
          <Route exact path="/" render={() => <h1>Palette List</h1>} />
          <Route
            exact
            path="/palette/:id"
            render={routeProps => (
              <Palette
                palette={generatePalette(this.findPalette(routeProps.match.params.id))}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App;
