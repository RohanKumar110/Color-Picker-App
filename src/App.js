import React, { Component } from 'react';
import Palette from "./Palette";
import seedPalette from "./seedPalette";
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Palette {...seedPalette[4]} />
      </div>
    )
  }
}

export default App;
