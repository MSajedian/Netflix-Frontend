import { Container, Alert, Dropdown } from "react-bootstrap";
import Gallery from "./Gallery";
import React, { Component } from "react";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            defaultMovies: [],
            spiderManMovies: [],
            starWarsMovies: [],
            searchedMovies: [],
            loading: true,
            error: false,
            comments: [],
        };
    }

    // url = "https://www.omdbapi.com/?apikey=c71a553d";
    url = "https://app-netflix-backend.herokuapp.com/medias";

    componentDidMount = () => {
        fetch(this.url, { headers: { Origin: process.env.REACT_APP_FRONTEND_API_URL } })
            .then((response) => response.json())
            .then((responseObject) =>
                this.setState({ defaultMovies: responseObject })
            )
            .then(() => this.setState({ loading: false }))
            .catch((err) => {
                this.setState({ error: true });
                console.log("An error has occurred:", err);
            });
    };

    fetchComments = async (movieID) => {
        const commentsUrl = "https://striveschool-api.herokuapp.com/api/comments/";
        const comments = await fetch(commentsUrl + movieID, {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDkyYjUyYTAyNTNhYTAwMTU5NjRhNTkiLCJpYXQiOjE2MjE1ODE1MTMsImV4cCI6MTYyMjc5MTExM30.xX1bdh-kAI426pIAHwyGgERUwH-di9UXYWKK1-jFlvY",
            }
        }).then((response) => response.json());
        this.setState({ comments });
    };

    showSearchResult = (searchString) => {
        fetch(this.url + "&s=" + searchString.toString())
            .then((response) => response.json())
            .then((responseObject) => {
                if (responseObject.Search) {
                    this.setState({ searchedMovies: responseObject.Search })
                }
            }
            );
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchString !== this.props.searchString) {
            this.setState({ searchString: this.props.searchString });
            this.showSearchResult(this.props.searchString)
        }
    }

    render() {
        return (
            <>
                <Container fluid className="px-4">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <h2 className="mb-4">TV Shows</h2>
                            <div className="ml-4 mt-1">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        style={{ backgroundColor: "#221f1f" }}
                                        id="dropdownMenuButton"
                                        className="btn-secondary btn-sm dropdown-toggle rounded-0"
                                    >
                                        Genres
          </Dropdown.Toggle>
                                    <Dropdown.Menu bg="dark">
                                        <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            <i className="fa fa-th-large icons"></i>
                            <i className="fa fa-th icons"></i>
                        </div>
                    </div>
                    {this.state.error && (
                        <Alert variant="danger" className="text-center">
                            An error has occurred, please try again later
                        </Alert>
                    )}

                    {this.state.searchedMovies.length > 0 && (
                        <Gallery
                            title={"Search results"}
                            fetchComments={this.fetchComments}
                            comments={this.state.comments}
                            movies={this.state.searchedMovies}
                        />
                    )}

                    {!this.state.error && this.state.defaultMovies.length > 0 && (
                        <Gallery
                            title="Movies"
                            loading={this.state.loading}
                            fetchComments={this.fetchComments}
                            comments={this.state.comments}
                            movies={this.state.defaultMovies.slice(0, 12)}
                        />
                    )}
                </Container>
            </>);
    }
}
export default Home;