import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "./Axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "../stylesheets/Movie.scss";
import { FaStar } from "react-icons/fa";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const getMoviesData = async () => {
    const res = await api.get("http://localhost:8080/api/v1/movies.json");
    console.log(res);
    setMovies(res.data);
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
      setSearchValue(e.target.value);
    }
  
    const resetInputField = () => {
      setSearchValue("")
    }
  
    const callSearchFunction = (e) => {
      e.preventDefault();
      props.search(searchValue);
      resetInputField();
    }

    return (
      <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
    );
  };

  return (
    <div>
      <Search />
      <div className="movie-container"></div>
      <div className="movie-wrapper">
        {movies.map((movie) => {
          return (
            <div className="container-glass">
              <img src={movie.poster_url} alt="" />
              <div className="movie-card-text">
                <div className="movie-card-description">
                  <div className="movie-rating">
                    <h2>
                      <FaStar />
                    </h2>
                    <h3>{movie.rating}</h3>
                    <h4>/10</h4>
                  </div>
                </div>
                <div className="movie-title-card">
                  <h3>
                    <Link to={`/movies/${movie.id}/`}>{movie.title}</Link>
                  </h3>
                </div>
                <button class="btn">Discover</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movie;
