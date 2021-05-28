import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import uniqid from 'uniqid'

class ShowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Movie: {},
            reviews: []
        }
    }

    componentDidMount() {
        let idFromTheURLBar = this.props.match.params.movieId.toString()
        console.log('idFromTheURLBar:', idFromTheURLBar)
        this.fetchMovie(idFromTheURLBar)
        this.fetchReviews(idFromTheURLBar)
    }

    // url = "https://www.omdbapi.com/?apikey=c71a553d";
    url = "https://app-netflix-backend.herokuapp.com";

    fetchMovie = async (idFromTheURLBar) => {
        try {
            let response = await fetch(`${this.url}/medias/${idFromTheURLBar}`, { headers: { Origin: process.env.REACT_APP_FRONTEND_API_URL } })
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

    // fetchReviews = async (movieID) => {
    //     const reviewsUrl = "https://app-netflix-backend.herokuapp.com/reviews/";
    //     const reviews = await fetch(reviewsUrl + movieID, { headers: { Origin: process.env.REACT_APP_FRONTEND_API_URL } })
    //         .then((response) => response.json());
    //     console.log('this.state.reviews:', this.state.reviews)
    //     this.setState({ reviews });
    // };

    fetchReviews = async (movieID) => {
        try {
            let response = await fetch(`${this.url}/reviews/${movieID}`, { headers: { Origin: process.env.REACT_APP_FRONTEND_API_URL } })
            if (response.ok) {
                let data = await response.json()
                console.log("reviews", data)
                this.setState({ reviews: data })
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
            this.setState({ isError: true, isLoading: false })
        }
    }

    render() {
        return (
            <Container >
                <Row className="justify-content-center">
                    <h1 className="text-white">ShowDetail</h1>
                </Row>
                <Row className="justify-content-center">
                    {this.state.Movie && (
                        <div>
                            <img src={this.state.Movie.Poster} alt={this.state.Movie.Title} />
                            <div className="text-white text-center">{this.state.Movie.Title}</div>
                            {this.state.reviews.map((review) => (
                                <div className="text-white" key={uniqid()}>
                                    <hr />
                                    {review.review}
                                    <div className="text-white">Rate: {review.rate} </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ShowDetail;