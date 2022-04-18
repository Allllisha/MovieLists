import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/Form.scss";
import { getCurrentUser } from "../apis/Auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../apis/Axios";

const NewLists = () => {
  const [user, setCurrentUser] = useState([]);

  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
  });

  const [newList, setNewList] = useState({
    name: "",
    user_id: "",
  });

  const [image, setImage] = useState({
    images: "",
  });

  const handleOnChange = (event) => {
    const value = event.target.value;
    setNewList({
      ...newList,
      [event.target.name]: value,
    });
  };

  const handleOnFileChange = (event) => {
    const value = event.target.files[0];
    setImage({
      ...image,
      [event.target.name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
 
    const sendPostRequest = async () => {
      try {
        let params = new FormData();
        params.append("image_url", image.images);
        params.append("name", newList.name);
        params.append("user_id", user.id);
        const response = await api.post(
          `/lists.json`,
          params,
          { headers: { "content-type": "multipart/form-data" } }
        );
        console.log(response.data);
        navigate("/home");
      } catch (err) {
        console.error(err);
      }
    };
    sendPostRequest();
  };

  return (
    <div className="bg">
      <div className="glass">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                name="name"
                value={newList.name}
                onChange={handleOnChange}
              />
            </Form.Group>
            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Images
              </label>
              <input
                className="form-control"
                name="images"
                type="file"
                id="formFileMultiple"
                multiple
                value={newList.images}
                onChange={handleOnFileChange}
              />
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewLists;
