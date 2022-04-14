import React from "react";
import "../stylesheets/List.scss";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./Auth";
import { api } from "./Axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {  useParams } from "react-router-dom";

const List = () => {
  const [lists, setLists] = useState([]);
  const { userId } = useParams();

  const getListsData = async () => {
    const res = await api.get("http://localhost:8080/api/v1/lists.json");
    console.log(res.data);
    setLists(res.data);
  };

  useEffect(() => {
    getListsData();
  }, []);

  const [user, setCurrentUser] = useState([]);
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
  });
   
  const handleOnFollow= async (id, event) => {
    event.preventDefault();
    let params = new FormData();
    params.append("list_id", id);
    params.append("user_id", userId);
    const response = await api.post(`http://localhost:8080/api/v1/list_followers.json`, params);
    console.log(response);
  };
 
  return (
    <div>
      <div className="home-banner">
        <div className="hb-container">
          <h1>All Movie list</h1>
        </div>
      </div>

      <div className="lists-container d-flex justify-content-around my-box-light flex-wrap mb-2">
        {lists.map((list) => {
          return (
            <div>
              <div className="card bg-dark text-white">
                <img
                  src={`http://localhost:8080${list.image_url.url}`}
                  alt=""
                />
                <div className="card-img-overlay">
                  <h4 className="card-title">
                    <Link to={`/lists/${list.id}/${user.id}`}>{list.name}</Link>
                  </h4>
                  <div className="follow-button">
                  <Button
                   onClick={(e) => {
                    handleOnFollow(list.id, e);
                  }}
                  >+ Follow</Button>
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
