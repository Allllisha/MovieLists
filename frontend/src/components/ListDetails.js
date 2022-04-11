import React from "react";
import { useState, useEffect } from "react";
import { api } from "./Axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
import "../stylesheets/MovieDetails.scss";

const ListDetails = () => {
  const [movie, setMovie] = useState([]);
  const { listId } = useParams();
  const getListsData = async () => {
    const res = await api.get(
      `http://localhost:8080/api/v1/lists/1.json`
    );
    setMovie(res.data);
  };

  useEffect(() => {
    getListsData();
  });

  const style = {
    backgroundImage: `url(${movie.poster_url})`,
  };

  const star = "⭐";

  return(
    <div>
      <div class="card-category">
        <div class="movie_card" id="bright">
          <div class="info_section">
            <Link to={`/list`}></Link>
            <div class="movie_header">
              <div className="locandina">
                <img src={movie.poster_url} alt="" />
              </div>
              <h1>{movie.title}</h1>
              <h4>
                {movie.rating} {star.repeat(movie.rating)}
              </h4>
            </div>
            <div class="movie-description">
              <div class="overview-text">{movie.overview}</div>
            </div>
            <div class="movie_social"></div>
          </div>
          <div class="blur_back bright_back" style={style}></div>
        </div>
      </div>
      <div class="content"></div>
      <Link to={`/bookmarks/lists/${listId}`}>Add Movie</Link>
    </div>
  )
} 

export default ListDetails;