import { Container, Alert, Dropdown } from "react-bootstrap";
import Gallery from "./Gallery";
import React from "react";

const Home = () => {
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
                        title="Search results"
                        fetchComments={this.fetchComments}
                        comments={this.state.comments}
                        movies={this.state.searchedMovies}
                    />
                )}
                {!this.state.error && !this.state.searchedMovies.length > 0 && (
                    <>
                        <Gallery
                            title="Harry Potter"
                            loading={this.state.loading}
                            fetchComments={this.fetchComments}
                            comments={this.state.comments}
                            movies={this.state.harryPotterMovies.slice(0, 6)}
                        />
                        <Gallery
                            title="Spider Man"
                            loading={this.state.loading}
                            fetchComments={this.fetchComments}
                            comments={this.state.comments}
                            movies={this.state.spiderManMovies.slice(0, 6)}
                        />
                        <Gallery
                            title="Star Wars"
                            loading={this.state.loading}
                            fetchComments={this.fetchComments}
                            comments={this.state.comments}
                            movies={this.state.starWarsMovies.slice(0, 6)}
                        />
                    </>
                )}
            </Container>
        </>);
}

export default Home;