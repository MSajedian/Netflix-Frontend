import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import NFNavbar from "./components/NFNavbar";
import Footer from "./components/Footer";
import ShowDetail from "./components/ShowDetail";
import Registration from "./components/Registration";

class App extends Component {

  render() {
    return (
      <div className="App">

        <Router>
          <NFNavbar showSearchResult={this.showSearchResult} />

          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} />} />
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
