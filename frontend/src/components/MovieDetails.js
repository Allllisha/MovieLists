import React from "react";
import { useState, useEffect } from "react";
import { api } from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./Auth";
import Form from "react-bootstrap/Form";
import Image from "../image/cinema.jpeg";
import Button from "react-bootstrap/Button";
import "../stylesheets/MovieDetails.scss";
import moment from 'moment';
import { FiDelete } from "react-icons/fi";

const MovieDetails = () => {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const [review, setReview] = useState({
    rating: "",
    comment: "",
    user_id:  "",
    movie_id: movieId,
  });


  const getMoviesData = async () => {
    const res = await api.get(
      `/movies/${movieId}.json`
    );
    setMovie(res.data);
  };

  useEffect(() => {
    getMoviesData();
  });

  const [user, setCurrentUser] = useState([]);
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
  });

  const style = {
    backgroundImage: `url(${movie.poster_url})`,
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setReview({
      ...review,
      [event.target.name]: value,
    });
  };

  const handleOnDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(`/movie_reviews/${id}.json`);
    console.log(response);
    const reviewItems = review.filter((item) => item.id !== id);
    setReview(reviewItems)
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const sendPostRequest = async () => {
      try {
        let params = new FormData();
        params.append("rating", review.rating);
        params.append("comment", review.comment);
        params.append("user_id", user.id);
        params.append("movie_id", review.movie_id);
        const response = await api.post(`/movie_reviews.json`, params);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    navigate(`/movies/${movie.id}`);
    sendPostRequest();
  };

  

  const star = "⭐";

  return (
    <div>
      <div className="card-category">
        <div className="movie_card" id="bright">
          <div className="info_section">
            <Link to={`/list`}></Link>
            <div className="movie_header">
              <div className="locandina">
                <img src={movie.poster_url} alt="" />
              </div>
              <h1>{movie.title}</h1>
              <h4>
                {movie.rating} {star.repeat(movie.rating)}
              </h4>
            </div>
            <div className="movie-description">
              <div className="overview-text">{movie.overview}</div>
            </div>
            <div className="movie_social"></div>
          </div>
          <div className="blur_back bright_back" style={style}></div>
        </div>
      </div>
      <div className="content"></div>

  
      <div className="comment-container">
      <div className="part-one">
          {(movie.movie_reviews || []).map((review) => {
            return (
              <div className="comments">
                <div className="reviewer-info">
                  <div className="reviewer-foto">
                  {review.user_image.url
                    ? <img src={`http://localhost:8080${ review.user_image.url }`} alt="" />
                    : <img src={Image} alt="" />}</div>
                  <div className="reviewer-name">{review.user_name}</div>
                  </div>
                <div className="comment-line">
                  <div className="stars">{star.repeat(review.rating)}</div>
                  <div>{review.comment}</div>
                </div>
                <div className="time-delete">
                  <div className="time-destroy">
                    <p>
                      {moment(review.created_at).format("D MMMM YYYY HH:mm")}
                    </p>
                    <div className="trash-item">
                    {review.user_id === user.id 
                    ? <FiDelete onClick={(e) => {handleOnDelete(review.id, e)}}/>
                    : <> </>}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
          <div className="part-two">
          <h4>Review for {movie.title}</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="comment"
                  name="comment"
                  value={review.comment}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="star-rating">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  onChange={handleOnChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  onChange={handleOnChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  checked
                  onChange={handleOnChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  onChange={handleOnChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
    </div>
  );
};

export default MovieDetails;
