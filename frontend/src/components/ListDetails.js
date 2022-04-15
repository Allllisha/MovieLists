import React from "react";
import { useState, useEffect } from "react";
import { api } from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCurrentUser } from "./Auth";
import "../stylesheets/MovieDetails.scss";
import "../stylesheets/ListDetails.scss";
import { FiDelete } from "react-icons/fi";
import moment from "moment";
import Slider from "react-slick";
import { FaTrash } from "react-icons/fa";
import Image from "../image/cinema.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const ListDetails = () => {
  const [list, setList] = useState([]);
  const { listId } = useParams();
  // const [bookmarks, setBookmarks] = useState([]);
  const [review, setReview] = useState({
    rating: "",
    comment: "",
    user_id: "",
    list_id: "",
  });
  const getListsData = async () => {
    const res = await api.get(`http://localhost:8080/api/v1/lists/${listId}.json`);
    setList(res.data);
  };

  useEffect(() => {
    getListsData();
  });

  const [user, setCurrentUser] = useState([]);
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
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

    const sendPostRequest = async () => {
      try {
        let params = new FormData();
        params.append("rating", review.rating);
        params.append("comment", review.comment);
        params.append("user_id", user.id);
        params.append("list_id", listId);
        const response = await api.post(
          `http://localhost:8080/api/v1/list_reviews.json`,
          params
        );
        console.log(response.data);
        navigate(`/lists/${list.id}`);
      } catch (err) {
        console.error(err);
      }
    };
    sendPostRequest();
  };




  const handleOnMovieDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(
      `http://localhost:8080/api/v1/bookmarks/${id}.json`
    );
    console.log(response);
    const bookmarkItems = list.bookmarks.filter((item) => item.id !== id);
    setList(bookmarkItems);
  };

  const star = "⭐";

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
  };

  const handleOnDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(
      `http://localhost:8080/api/v1/list_reviews/${id}.json`
    );
    console.log(response);
    const reviewItems = review.filter((item) => item.id !== id);
    setReview(reviewItems);
  };

  const AddMovie = () => {
    if ( list.user_id === user.id ) {
      return (
        <Link to={`/bookmarks/lists/${listId}`}>
        <Button>Add Movie</Button>
      </Link>
      );
    } else {
      return (
        <>
        </>
      );
    }
  };

  return (
    <div>
      <Slider {...settings}>
        {(list.bookmarks || []).map((bookmark) => {
          return (
            <div className="card-category">
              <div className="movie_card" id="bright">
                <div className="info_section">
                  <Link to={`/list`}></Link>
                  <div className="movie_header">
                    <div className="locandina">
                      <img src={bookmark.poster_url} alt="" />
                    </div>
                    <h1>{bookmark.movie_title}</h1>
                    <h4>
                      {bookmark.rating} {star.repeat(bookmark.rating)}
                    </h4>
                  </div>
                  <div className="movie-description">
                    <h6>Comment from {list.user_name}</h6>

                    <div className="edit-delete">
                      <div className="delete-item">
                      {list.user_id === user.id 
                    ? <FaTrash onClick={(e) => {handleOnMovieDelete(bookmark.id, e);}}/>
                    : <> </>}  
                      </div>
                    </div>

                    <div className="overview-text">{bookmark.comment}</div>
                  </div>
                  <div className="movie_social"></div>
                </div>
                <div
                  className="blur_back bright_back"
                  style={{ backgroundImage: `url(${bookmark.poster_url})` }}
                ></div>
              </div>
            </div>
          );
        })}
      </Slider>

      <div className="bookmark-button">
      <AddMovie />
      </div>

      <div className="comment-container">
        <div className="part-one">
          {(list.list_reviews || []).map((review) => {
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
                    {list.user_id === user.id 
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
  );
};

export default ListDetails;
