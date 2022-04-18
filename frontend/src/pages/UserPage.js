import React from "react";
import "../stylesheets/List.scss";
import Image from "../image/cinema.jpeg";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../apis/Auth";
import { api } from "../apis/Axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const UserPage = () => {
  const [lists, setLists] = useState([]);
  const [image, setImage] = useState([]);
  const [follows, setFollows] = useState([]);

  const [user, setCurrentUser] = useState([]);
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
  });

  const getListsData = async () => {
    const res = await api.get(`/users/${user.id}.json`);
    setLists(res.data.lists);
    setImage(res.data.image.url);
    setFollows(res.data.list_followers);
  };

  useEffect(() => {
    getListsData();
  });

  const currentUser = getCurrentUser();
  const WelcomeMessage = () => {
    if (image === null) {
      return (
        <div className="welcome-user">
          <Link to={`/users/${user.id}/edit`}>
            <img src={Image} alt="" />
          </Link>
          <div className="user-info">
            <div className="welcome"></div>
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
        <div className="welcome-user">
          <img src={`http://localhost:8080${image}`} alt="" />
          <div className="user-info">
            <div className="welcome"></div>
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

  const handleOnDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(`/lists/${id}.json`);
    console.log(response);
    const listItems = lists.filter((item) => item.id !== id);
    setLists(listItems);
  };

  const handleOnUnFollow = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(`/list_followers/${id}.json`);
    console.log(response);
    const followItems = follows.filter((item) => item.id !== id);
    setFollows(followItems);
  };

  return (
    <div>
      <div className="home-banner">
        <div className="hb-container">
          <WelcomeMessage />
        </div>
      </div>

      <Tabs>
        <TabList>
          <Tab>My Lists</Tab>
          <Tab>Followed Lists</Tab>
        </TabList>

        <TabPanel>
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
                      <div className="item">
                        <div className="icon-edit">
                          <Link to={`/lists/${list.id}/edit`}>
                            <FaEdit />
                          </Link>
                        </div>
                        <div className="icon-delete">
                          <FaTrash
                            onClick={(e) => {
                              handleOnDelete(list.id, e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="lists-container d-flex justify-content-around my-box-light flex-wrap mb-2">
            {follows.map((follow) => {
              return (
                <div>
                  <div className="card bg-dark text-white">
                    <img
                      src={`http://localhost:8080${follow.list_image.url}`}
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <h4 className="card-title">
                        <Link to={`/lists/${follow.list_id}`}>
                          {follow.list_name}
                        </Link>
                      </h4>
                      <div className="unfollow-button">
                        <Button
                          onClick={(e) => {
                            handleOnUnFollow(follow.id, e);
                          }}
                        >
                          Unfollow
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default UserPage;
