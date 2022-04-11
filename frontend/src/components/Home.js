import React from "react";
import "../stylesheets/Home.scss";
import { Link } from "react-router-dom";
import {  useState, useEffect } from 'react';
import { getCurrentUser } from './Auth';
import { FaSearch } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa";

const Home = () => {
  const [user, setCurrentUser] = useState([])
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };
 
  useEffect(() => {
    getCurrentUserData();
  });

  return (
    <div>
      <div className="user-info-container">
        <div class="welcome-user">
          <h5>Welcome, {user.nickname}</h5>
        </div>
      </div>
      <div class="action-container">
        <div class="part-1">
          <div class="icon">
            <FaSearch />
          </div>
          <h5>
            <Link to={`/movies`}>Search Movies</Link>
          </h5>
        </div>
        <div class="part-2">
          <div class="icon">
            <FaFilm />
          </div>
          <h5>
            <Link to={`/lists`}>All Lists</Link>
          </h5>
        </div>
        <div class="part-3">
          <div class="icon">
            <FaFileVideo />
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
