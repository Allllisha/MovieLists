import React from "react";
import { Link } from "react-router-dom";
import { api } from "./Axios";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Movie.scss";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./Auth";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia-min.css";

const Movie = () => {
  const [user, setCurrentUser] = useState([]);
  const searchClient = algoliasearch(
    "O9HDSVJ69E",
    "c5fdb5ee8f413cf23f533da3ed603050"
  );

  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data.id);
  };

  useEffect(() => {
    getCurrentUserData();
  });


  const Hit = ({ hit }) => {
    const [modalShow, setModalShow] = useState(false);
 

    const MyVerticallyCenteredModal = (props) => {
      const [lists, setLists] = useState([]);
      const [bookmark, setBookmark] = useState({
        movie_id: hit.objectID,
        list_id: "",
        comment: "",
      });
    

      const getMylistData = async () => {
        const res = await api.get(`http://localhost:8080/api/v1/users/${user}.json`);
        setLists(res.data.lists);
      };

      useEffect(() => {
        getMylistData();
      });

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
            const response = await api.post(`http://localhost:8080/api/v1/bookmarks.json`, BookmarksData);
            console.log(response);
            navigate(`/search_movies`);
          } catch (err) {
            console.error(err);
          }
        };
        sendPostRequest();
      };

      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add {hit.title} to the list?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  placeholder="comment"
                  name="comment"
                  value={bookmark.comment}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Select
                className="mb-3"
                name="list_id"
                value={bookmark.list_id}
                onChange={handleOnChange}
              >
                <option selected>Select your List</option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    };

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
          <Button class="btn" onClick={() => setModalShow(true)}>
            Add to List
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
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
