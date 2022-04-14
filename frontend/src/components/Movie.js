import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Movie.scss";
import { FaStar } from "react-icons/fa";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import 'instantsearch.css/themes/algolia-min.css';

const Movie = () => {

  const searchClient = algoliasearch(
    "O9HDSVJ69E",
    "c5fdb5ee8f413cf23f533da3ed603050"
  );

  const Hit = ({ hit }) => {
    return (
      <div className="container-glass">
        <img src={hit.poster_url} alt="" />
        <div className="movie-card-text">
          <div className="movie-card-description">
            <div className="movie-rating">
              <h2>
                <FaStar />
              </h2>
              <h3>{hit.rating}</h3>
              <h4>/10</h4>
            </div>
          </div>
          <div className="movie-title-card">
            <h3>
              <Link to={`/movies/${hit.objectID}`}>{hit.title}</Link>
            </h3>
          </div>
          <button class="btn">Discover</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <InstantSearch indexName="MovieList" searchClient={searchClient}>
        <div className="movie-container">
        <SearchBox />
        </div>
        <div className="movie-wrapper">
          <Hits hitComponent={Hit} />
          </div>  
      </InstantSearch>
    </div>
  );
};

export default Movie;
