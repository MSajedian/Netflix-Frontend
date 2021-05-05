import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";


class ShowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Movie: {},
            comments: []
        }
    }

    componentDidMount() {
        let idFromTheURLBar = this.props.match.params.movieId.toString()
        console.log('idFromTheURLBar:', idFromTheURLBar)
        this.fetchMovie(idFromTheURLBar)
        this.fetchComments(idFromTheURLBar)
    }

    url = "http://www.omdbapi.com/?apikey=c71a553d";

    fetchMovie = async (idFromTheURLBar) => {
        try {
            let response = await fetch(`${this.url}&i=${idFromTheURLBar}`)
            if (response.ok) {
                let data = await response.json()
                console.log("data", data)
                this.setState({ Movie: data })
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
            this.setState({ isError: true, isLoading: false })
        }
    }

    fetchComments = async (movieID) => {
        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const comments = await fetch(commentsUrl + movieID, {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMGNjMGIxZjBmYjAwMTVkOTE3MDYiLCJpYXQiOjE2MTkwMDQ2MDksImV4cCI6MTYyMDIxNDIwOX0.DGDlgKpWowe1bbzGnpP8h09QTfnZMSrDp93COWwfleU",
            }
        }).then((response) => response.json());
        this.setState({ comments });
    };

    render() {
        return (
            <Container >
                <Row className="justify-content-center">
                    <h1 className="text-white">ShowDetail</h1>
                </Row>
                <Row className="justify-content-center">
                    {this.state.Movie && this.state.comments && (
                        <div>
                            <img src={this.state.Movie.Poster} alt={this.state.Movie.Title} />
                            <div className="text-white text-center">{this.state.Movie.Title}</div>
                            <div className="text-white text-center"><b>comments:</b>{this.state.comments}</div>
                        </div>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ShowDetail;