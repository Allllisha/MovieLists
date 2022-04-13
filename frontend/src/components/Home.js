import React from "react";
import "../stylesheets/Home.scss";
import Image from "../image/cinema.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./Auth";
import { FaSearch } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa";

const Home = () => {
  const [user, setCurrentUser] = useState([]);
  const [image, setImage] = useState([]);

  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
    setImage(res.data.data.image.url);
  };

  useEffect(() => {
    getCurrentUserData();
  });

  const currentUser = getCurrentUser();
  const WelcomeMessage = () => {
    if ( image === null ) {
      return (
        <div className="welcome-user">
          <img
            src={Image}
            alt=""
          />
          <div className="user-info">
            <div className="welcome">
              <h5>Hi,</h5>
            </div>
            <div className="nickname">
              <h5>
                <Link to={`/users/${user.id}/edit`}>{user.nickname}</Link>
              </h5>
            </div>
          </div>
        </div>
      );
    } else if (currentUser) {
      return (
        <div class="welcome-user">
          <img src={`http://localhost:8080${image}`} alt="" />
          <div className="user-info">
            <div className="welcome">
              <h5>Welcome,</h5>
            </div>
            <div className="nickname">
              <h5>
                <Link to={`/users/${user.id}/edit`}>{user.nickname}</Link>
              </h5>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <h1>Please Sign in.</h1>
        </>
      );
    }
  };

  return (
    <div>
      <div className="user-info-container">
        <WelcomeMessage />
      </div>
      <div class="action-container">
        <div class="part-1">
          <div class="icon">
            <h1>
              <FaSearch />
            </h1>
          </div>
          <h5>
            <Link to={`/movies`}>Search Movies</Link>
          </h5>
        </div>
        <div class="part-2">
          <div class="icon">
            <h1>
              <FaFilm />
            </h1>
          </div>
          <h5>
            <Link to={`/lists`}>All Lists</Link>
          </h5>
        </div>
        <div class="part-3">
          <div class="icon">
            <h1>
              <FaFileVideo />
            </h1>
          </div>
          <h5>
            <Link to={`/new/${user.id}`}>New Lists</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Home;
