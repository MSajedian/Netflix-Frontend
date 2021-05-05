import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import NFNavbar from "./components/NFNavbar";
import Footer from "./components/Footer";
import ShowDetail from "./components/ShowDetail";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      harryPotterMovies: [],
      spiderManMovies: [],
      starWarsMovies: [],
      searchedMovies: [],
      loading: true,
      error: false,
      comments: [],
    };
  }

  url = "http://www.omdbapi.com/?apikey=c71a553d";

  componentDidMount = () => {
    Promise.all([
      fetch(this.url + "&s=harry%20potter")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ harryPotterMovies: responseObject.Search })
        ),
      fetch(this.url + "&s=spider%20man")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ spiderManMovies: responseObject.Search })
        ),
      fetch(this.url + "&s=star%20wars")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ starWarsMovies: responseObject.Search })
        ),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
  };

  showSearchResult = (searchString) => {
    fetch(this.url + "&s=" + searchString)
      .then((response) => response.json())
      .then((responseObject) =>
        this.setState({ searchedMovies: responseObject.Search })
      );
  };

  fetchComments = async (movieID) => {
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const comments = await fetch(commentsUrl + movieID, {
      headers: new Headers({
        Authorization: "[INSERT_YOUR_AUTH_HERE]",
      }),
    }).then((response) => response.json());
    this.setState({ comments });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <NFNavbar showSearchResult={this.showSearchResult} />

          <Route path="/" exact render={(props) => <Home />} />
          <Route path="/details/:movieId" exact render={(props) => <ShowDetail {...props}/>} />

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
