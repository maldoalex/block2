import React, { Component } from "react";
import axios from "axios";
import data from "./Movie80sData";
import MovieCard from "./MovieCard";

class Movie80s extends Component {
  constructor() {
    super();
    this.state = {
      imdbID: data,
      movies: []
    };
  }

  urlBuilder = () => {
    let url = this.state.imdbID.map(e => {
      return axios.get(`http://www.omdbapi.com/?i=${e}&apikey=579b4fff`);
    });
    return url;
  };

  movieBuilder = () => {
    let urls = this.urlBuilder();
    console.log(urls);
    Promise.all(urls).then(results => {
      const movies = results.map(result => result.data);
      this.setState({ movies });
    });
  };

  componentDidMount() {
    this.movieBuilder();
  }

  addMovie(value) {
    this.setState({ imdbID: [...this.state.imdbID, value] });
  }

  render() {
    const movies = this.state.movies;
    let movieBlock = movies.map(e => {
      return (
        <div className="movie">
          <h1>{e.Title}</h1> <img src={e.Poster} />
        </div>
      );
    });

    return (
      <div className="movies80">
        <div>
          <h1>Top 80s Movies</h1>
          <div className="movies">{movieBlock}</div>
          <input
            onChange={e => {
              this.addMovie(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Movie80s;
