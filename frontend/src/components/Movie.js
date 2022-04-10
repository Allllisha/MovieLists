import React from "react";
// import { Link } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import { api } from "./Axios";
import '../stylesheets/Movie.scss';
import { FaStar } from "react-icons/fa"

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const getMoviesData = async () => {
    const res = await api.get("http://localhost:8080/api/v1/movies.json");
    console.log(res)
    setMovies(res.data);
  };

  useEffect(() => {
    getMoviesData();
  }, []);



  return(
    <div className="movie-wrapper">
    {movies.map((movie)=>{
      return(
        <div className="container-glass">
        <img src={movie.poster_url} alt="" />
        <div className="movie-card-text">
          <div className="movie-card-description">
            <div className="movie-rating">
            <h2><FaStar /></h2>
            <h3>{movie.rating}</h3>
            <h4>/10</h4>
            </div>
          </div>
          <div className="movie-title-card">
          <h3>{movie.title}</h3>
          </div>
          <button class="btn">Discover</button>
        </div>
      </div>
      )
    })}
  </div>
  )
} 

export default Movie;