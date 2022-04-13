import React from "react";
import { useState, useEffect } from "react";
import { api } from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/MovieDetails.scss";
import "../stylesheets/ListDetails.scss";
import { FiDelete } from "react-icons/fi";
import moment from 'moment';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


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

  const star = "⭐";

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
  };

  const handleOnDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(`http://localhost:8080/api/v1/list_reviews/${id}.json`);
    console.log(response);
    const reviewItems = review.filter((item) => item.id !== id);
    setReview(reviewItems)
  };

  return(
    <div>
      <Slider {...settings}>
      {(list.movies || []).map((movie)=>{
         return(
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
          <div className="blur_back bright_back" style={{ backgroundImage: `url(${movie.poster_url})` }}></div>
        </div>
      </div>
         )
      })}
     </Slider>

    <div className="bookmark-button">
    <Link to={`/bookmarks/lists/${listId}`}><Button>Add Movie</Button></Link>
    </div>
      
    <div className="movie-comment-container">
 
      <div className="">
      </div>
    </div>
   


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
                  <div className="comment-line">
                    {review.name}
                    <div className="stars">{star.repeat(review.rating)}</div>
                    <div>{review.comment}</div>
                  </div>
                  <div className="time-delete">
                    <div className="time-destroy">
                  <p>{moment(review.created_at).format('D MMMM YYYY HH:mm')}</p>
                  <div className="trash-item">
                  < FiDelete
                  onClick={(e) => {handleOnDelete(review.id,  e)}}
                   />
                  </div>
                  </div>
                  <hr />
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
    </div>
  )
} 

export default ListDetails;