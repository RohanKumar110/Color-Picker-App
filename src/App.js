import React, { Component } from 'react';
import Palette from "./Palette";
import seedPalette from "./seedPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <h1>Palette List</h1>} />
          <Route exact path="/palette/:id" render={() => <h1>Palette Component</h1>} />
        </Switch>
      </div>
    )
  }
}
{/* <Palette palette={generatePalette(seedPalette[4])} /> */ }

export default App;
