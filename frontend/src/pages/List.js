import React from "react";
import "../stylesheets/List.scss";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../apis/Auth";
import { api } from "../apis/Axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const List = () => {
  const [lists, setLists] = useState([]);
  const [user, setCurrentUser] = useState([]);
  const [followUser, setFollowUser] = useState([]);

  const getListsData = async () => {
    const res = await api.get("/lists.json");
    setLists(res.data);
  };

  useEffect(() => {
    getListsData();
  }, []);

  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
  });

  const getCurrentUserFollowData = async () => {
    const res = await api.get(`/users/${user.id}.json`);
    setFollowUser(res.data.list_followers);
  };

  useEffect(() => {
    getCurrentUserFollowData();
  });

  const handleOnFollow = async (id, event) => {
    event.preventDefault();
    let params = new FormData();
    params.append("list_id", id);
    params.append("user_id", user.id);
    const response = await api.post(`/list_followers.json`, params);
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
                    <Link to={`/lists/${list.id}`}>{list.name}</Link>
                  </h4>
                  <div className="follow-button">
                    {followUser.find((value) => {
                      return value.list_id === list.id;
                    }) ? (
                      <Button
                        onClick={(e) => {
                          handleOnFollow(list.id, e);
                        }}
                      >
                        Followed
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          handleOnFollow(list.id, e);
                        }}
                      >
                        Add
                      </Button>
                    )}
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
