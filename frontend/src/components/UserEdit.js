import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/Form.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./Axios";

const UserEdit = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    nickname: "",
    user_id: userId,
  });

  const [image, setImage] = useState({
    images: "",
  });

  const handleOnChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
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
        params.append("image", image.images);
        params.append("nickname", user.nickname);
        params.append("user_id", user.user_id);
        const response = await api.patch(`/users/${userId}.json`, params, {
          headers: { "content-type": "multipart/form-data" },
        });
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
        <div class="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="nickname"
                placeholder="username"
                name="nickname"
                value={user.nickname}
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
                value={user.images}
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

export default UserEdit;
