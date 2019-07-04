import React, { Component } from "react";
import Homepage from "./homepage";
import Login from "./login";
import Viewdetails from "./viewdetails";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/viewdetails" component={Viewdetails} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
