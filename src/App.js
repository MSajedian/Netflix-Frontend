import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import NFNavbar from "./components/NFNavbar";
import Footer from "./components/Footer";
import ShowDetail from "./components/ShowDetail";
import Registration from "./components/Registration";

class App extends Component {
  state = { searchString: "" }

  callbackFunction = (Input) => {
    this.setState({ searchString: Input })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NFNavbar parentCallback={this.callbackFunction} />
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} searchString={this.state.searchString} />} />
            <Route path="/details/:movieId" exact render={(props) => <ShowDetail {...props} />} />
            <Route path="/registration" exact render={(props) => <Registration {...props} />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
