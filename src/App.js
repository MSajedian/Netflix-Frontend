import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import NFNavbar from "./components/NFNavbar";
import Footer from "./components/Footer";
import ShowDetail from "./components/ShowDetail";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <NFNavbar showSearchResult={this.showSearchResult} />

          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route path="/details/:movieId" exact render={(props) => <ShowDetail {...props}/>} />

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
