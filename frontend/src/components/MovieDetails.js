import React from "react";
import { useState, useEffect } from "react";
import { api } from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/MovieDetails.scss";

const MovieDetails = () => {
  const [movie, setMovie] = useState([]);
  const { movieId, userId } = useParams();
  const [review, setReview] = useState({
    rating: "",
    comment: "",
    user_id: userId,
    movie_id: movieId,
  });


  const getMoviesData = async () => {
    const res = await api.get(
      `http://localhost:8080/api/v1/movies/${movieId}.json`
    );
    setMovie(res.data);
  };

  useEffect(() => {
    getMoviesData();
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

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = {
      rating: review.rating,
      comment: review.comment,
      user_id: review.user_id,
      movie_id: review.movie_id,
    };

    const sendPostRequest = async () => {
      try {
        const response = await api.post(`/reviews`, reviewData);
        console.log(response.data);
        navigate(
          `movies/${movieId}`
        );
      } catch (err) {
        console.error(err);
      }
    };
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
                  <div className="comment-container">
                  <div className="reviewer-photo">
                  </div>
                  <div>
                  {review.name}
                  </div>
                  </div>
                  {console.log(review)}
                  <div className="comment-line">
                    {review.name}
                    <div className="stars">{star.repeat(review.rating)}</div>
                    <div>{review.comment}</div>
                  </div>
                  <div className="time-delete">
                  <p>{review.created_at}</p>
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
