import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelper";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <h1>Palette list goes here</h1>}
        ></Route>
        <Route
          exact
          path="/palette/:id"
          render={() => <h1>individual palette goes here</h1>}
        ></Route>
      </Switch>
      /* <div className="App">
        <Palette palette={generatePalette(seedColors[4])} />
      </div>*/
    );
  }
}

export default App;
