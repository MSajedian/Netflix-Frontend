import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Movie from "./Movie";


class ShowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Movie: []
        }
    }


    componentDidMount() {
        let idFromTheURLBar = this.props.match.params.movieId
        console.log('idFromTheURLBar:', idFromTheURLBar)
        this.fetchMovie()
        console.log('this.state.Movie:', this.state.Movie)

        // let foundDish = items.find(dish => dish.id.toString() === idFromTheURLBar)
        // if (foundDish) {
        //     console.log(foundDish)
        //     this.setState({
        //         dishToShow: foundDish
        //     })
        // }
    }

    url = "http://www.omdbapi.com/?apikey=c71a553d";

    fetchMovie = async () => {
        try {
            let response = await fetch(this.url + "&s=harry%20potter")
            if (response.ok) {
                let data = await response.json()
                console.log("data.Search", data.Search)
                this.setState({ Movie: data.Search })
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
            this.setState({ isError: true, isLoading: false })
        }
    }

    // fetchMovie2 = () => {
    //     fetch(this.url + "&s=harry%20potter")
    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((responseObject) => {
    //             console.log(responseObject.Search);
    //             return this.setState({ Movie: responseObject.Search })
    //         }
    //         )
    //         .then(() => this.setState({ loading: false }))
    //         .catch((err) => {
    //             this.setState({ error: true });
    //             console.log("An error has occurred:", err);
    //         });
    // }



    render() {
        return (
            <Container >
                <Row className="justify-content-center">
                    <h1 className="text-white">ShowDetail</h1>
                </Row>
                <Row className="justify-content-center">
                    {
                        this.state.Movie.map((movie) => (
                            <Movie
                                data={movie}
                                key={movie.imdbID}
                                // comments={comments}
                                // fetchComments={fetchComments}
                            />
                        ))
                    }
                </Row>
            </Container>
        );
    }
}

export default ShowDetail;