import React from "react";
import "../stylesheets/List.scss";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./Auth";
import { useParams } from "react-router-dom";
import { api } from "./Axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const UserPage = () => {
  const { userId } = useParams();
  const [lists, setLists] = useState([]);
  const [follows, setFollows] = useState([]);


  const getListsData = async () => {
    const res = await api.get(
      `http://localhost:8080/api/v1/users/${userId}.json`
    );
    setLists(res.data.lists);
    setFollows(res.data.list_followers);
  };

  useEffect(() => {
    getListsData();
  });


  const [user, setCurrentUser] = useState([]);
  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };

  useEffect(() => {
    getCurrentUserData();
  });

  const handleOnDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(
      `http://localhost:8080/api/v1/lists/${id}.json`
    );
    console.log(response);
    const listItems = lists.filter((item) => item.id !== id);
    setLists(listItems);
  };

  const handleOnUnFollow = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(
      `http://localhost:8080/api/v1/list_followers/${id}.json`
    );
    console.log(response);
    const followItems = follows.filter((item) => item.id !== id);
    setFollows(followItems);
  };

  return (
    <div>
      <div className="home-banner">
        <div className="hb-container">
          <h1>My Movie list</h1>
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
                        <Link to={`/lists/${list.id}/${user.id}`}>
                          {list.name}
                        </Link>
                      </h4>
                      <div class="item">
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
                        <Link to={`/lists/${follow.list_id}/${user.id}`}>
                          {follow.list_name}
                        </Link>
                      </h4>
                      <div className="unfollow-button">
                      <Button
                         onClick={(e) => {
                          handleOnUnFollow(follow.id, e);
                        }}
                      >Unfollow</Button>
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
