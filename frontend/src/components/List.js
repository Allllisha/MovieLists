import React from "react";
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


  const handleOnDelete = async (id, event) => {
    event.preventDefault();
    const response = await api.delete(`http://localhost:8080/api/v1/lists/${id}.json`);
    console.log(response);
    const listItems = lists.filter((item) => item.id !== id);
    setLists(listItems)
    
  };

  console.log(user.id)
  return (
    <div>
      <div className="home-banner">
        <div className="hb-container">
          <h1>{user.nickname}'s Movie list</h1>
        </div>
      </div>

      <div className="lists-container d-flex justify-content-around my-box-light flex-wrap mb-2">
        {lists.map((list) => {
          return (
            <div>
              <div className="card bg-dark text-white">
                <img src={`http://localhost:8080${ list.image_url.url }`} alt="" />
                <div className="card-img-overlay">
                  <h4 className="card-title">
                    <Link to={`/lists/${list.id}/${user.id}`}>{list.name}</Link>
                  </h4>
                  <div class="item">
                    <div className="icon-edit">
                    <Link to={`/lists/${list.id}/edit`}><FaEdit /></Link>
                    </div>
                    <div className="icon-delete">
                    <FaTrash 
                  onClick={(e) => {handleOnDelete(list.id,  e)}}/>
                  </div>
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
