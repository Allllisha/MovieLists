import React from "react";
import { useState, useEffect } from "react";
import { api } from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/MovieDetails.scss";

const ListDetails = () => {
  const [list, setList] = useState([]);
  const { listId, userId } = useParams();
  const [review, setReview] = useState({
    rating: "",
    comment: "",
    user_id: userId,
    list_id: listId,
  });
  const getListsData = async () => {
    const res = await api.get(
      `http://localhost:8080/api/v1/lists/1.json`
    );
    setList(res.data);
  };

  useEffect(() => {
    getListsData();
  });

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
      list_id: review.list_id,
    };

    const sendPostRequest = async () => {
      try {
        const response = await api.post(`http://localhost:8080/api/v1/list_reviews.json`, reviewData);
        console.log(response.data);
        navigate(
          `lists/${listId}/${userId}`
        );
      } catch (err) {
        console.error(err);
      }
    };
    sendPostRequest();
  };


  const style = {
    backgroundImage: `url(${list.poster_url})`,
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
                <img src={list.poster_url} alt="" />
              </div>
              <h1>{list.title}</h1>
              <h4>
                {list.rating} {star.repeat(list.rating)}
              </h4>
            </div>
            <div class="movie-description">
              <div class="overview-text">{list.overview}</div>
            </div>
            <div class="movie_social"></div>
          </div>
          <div class="blur_back bright_back" style={style}></div>
        </div>
      </div>
      <div class="content"></div>


      <div className="comment-container">
          <div className="part-one">
            {(list.list_reviews || []).map((review) => {
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
          <h4>Review for {list.name}</h4>
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







      <Link to={`/bookmarks/lists/${listId}`}>Add Movie</Link>
    </div>
  )
} 

export default ListDetails;