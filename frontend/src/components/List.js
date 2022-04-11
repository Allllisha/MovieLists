import React from "react";
import image from "../image/movielist.jpeg";
import "../stylesheets/List.scss";
import { useState, useEffect } from "react";
import { getCurrentUser } from './Auth';
import { api } from "./Axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const List = () => {
  const [lists, setLists] = useState([]);
  const getListsData = async () => {
    const res = await api.get("http://localhost:8080/api/v1/lists.json");
    console.log(res.data);
    setLists(res.data);
  };

  useEffect(() => {
    getListsData();
  }, []);

  const [user, setCurrentUser] = useState([])
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };
 
  useEffect(() => {
    getCurrentUserData();
  });


  const style = {
    width: "100%",
    height: "300px",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  };

  return (
    <div>
      <div class="home-banner">
        <div class="hb-container" style={style}>
          <h1>{user.nickname}'s Movie list</h1>
        </div>
      </div>

      <div class="lists-container d-flex justify-content-around my-box-light flex-wrap mb-2">
        {lists.map((list) => {
          return (
            <div>
              <div class="card bg-dark text-white">
                <img src={`http://localhost:8080${ list.image_url.url }`} alt="" />
                <div class="card-img-overlay">
                  <h4 class="card-title">
                    <Link to={`/lists/${list.id}`}>{list.name}</Link>
                  </h4>
                  <div class="item">
                    <FaEdit />
                    <FaTrash />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
