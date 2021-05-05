import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

class ShowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Movie: {}
        }
    }

    componentDidMount() {
        let idFromTheURLBar = this.props.match.params.movieId.toString()
        console.log('idFromTheURLBar:', idFromTheURLBar)
        this.fetchMovie(idFromTheURLBar)
        // let foundDish = items.find(dish => dish.id.toString() === idFromTheURLBar)

        // if (foundDish) {
        //     console.log(foundDish)
        // this.setState({ dishToShow: foundDish })
        // }
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
                        </div>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ShowDetail;