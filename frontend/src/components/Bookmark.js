import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/Form.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./Axios";

const Bookmark = () => {
  const { listId } = useParams();
  const [movies, setMovies] = useState([]);
  const [bookmark, setBookmark] = useState({
    movie_id: "",
    list_id: listId,
    comment: "",
  });

  const getMoviesData = async () => {
    const res = await api.get("/movies.json");
    setMovies(res.data);
  };

  useEffect(() => {
    getMoviesData();
  }, []);



  const handleOnChange = (event) => {
    const value = event.target.value;
    setBookmark({
      ...bookmark,
      [event.target.name]: value,
    });
  };



  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const BookmarksData = {
      movie_id: bookmark.movie_id,
      list_id: bookmark.list_id,
      comment: bookmark.comment,
    };

    const sendPostRequest = async () => {
      try {
        const response = await api.post(`/bookmarks.json`, BookmarksData);
        console.log(response);
        navigate(`/lists/${listId}`);
      } catch (err) {
        console.error(err);
      }
    };
    sendPostRequest();
  };

  return (
    <div>
      <div className="bg">
        <div className="glass">
          <div class="form-container">
            <Form onSubmit={handleSubmit}>
            <Form.Select
            className="mb-3"
            name="movie_id"
            value={bookmark.movie_id}
            onChange={handleOnChange}
          >
            <option selected>Select Movies</option>
            {movies.map((movie) => {
              return (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              );
            })}
          </Form.Select>
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="comment"
                  placeholder="comment"
                  name="comment"
                  value={bookmark.comment}
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
    </div>
  );
};

export default Bookmark;
