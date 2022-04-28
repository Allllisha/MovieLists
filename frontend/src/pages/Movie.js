import React from "react";
import { Link } from "react-router-dom";
import { api } from "../apis/Axios";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Movie.scss";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../apis/Auth";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia-min.css";

const Movie = () => {
  const [user, setCurrentUser] = useState([]);
  const searchClient = algoliasearch(
    `${process.env.REACT_APP_ALGID}`,
    `${process.env.REACT_APP_ALGAPP}`
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
        movie_id: "",
        list_id: "",
        comment: "",
      });

      const getMylistData = async () => {
        const res = await api.get(`/users/${user}.json`);
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

        const sendPostRequest = async () => {
          try {
            let params = new FormData();
            params.append("movie_id", hit.objectID);
            params.append("list_id", bookmark.list_id);
            params.append("comment", bookmark.comment);
            const response = await api.post(`/bookmarks.json`, params);
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
            <div className="modal-poster">
              <img src={hit.poster_url} alt="" />
            </div>
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
