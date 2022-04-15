import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import Home from "./Home";
import UserEdit from "./UserEdit";
import UserPage from "./UserPage";
import Movie from "./Movie";
import Page from "./Page";
import List from "./List";
import Bookmark from "./Bookmark";
import NewLists from "./NewList";
import MovieDetails from "./MovieDetails";
import ListDetails from "./ListDetails";
import ListEdit from "./ListEdit";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Header from "./Header";
import Footer from "./Footer";
import { getCurrentUser } from "./Auth";
export const AuthContext = createContext();

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
};

export default App;

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        console.log(res.data.data);
        console.log("current user");
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const currentUsers = getCurrentUser();
  const navigate = useNavigate();
  const PrivateRoute = ({ children }) => {
    if (!loading) {
      if (currentUsers) {
        return children;
      } else {
        return navigate(`/sign_in`);
      }
    } else {
      return <></>;
    }
  };

  return (
    <div>
      <Header />
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Page />} />
          <Route exact path="/sign_up" element={<SignUp />} />
          <Route exact path="/sign_in" element={<SignIn />} />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/users/profile"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
           <Route
            exact
            path="/users/:userId/edit"
            element={
              <PrivateRoute>
                <UserEdit/>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/lists/:listId"
            element={
              <PrivateRoute>
                <ListDetails />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/lists"
            element={
              <PrivateRoute>
                <List />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/lists/:listId/edit"
            element={
              <PrivateRoute>
                <ListEdit />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new"
            element={
              <PrivateRoute>
                <NewLists />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/search_movies"
            element={
              <PrivateRoute>
                <Movie />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/movies/:movieId/"
            element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/bookmarks/lists/:listId"
            element={
              <PrivateRoute>
                <Bookmark />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthContext.Provider>
      <Footer />
    </div>
  );
};
