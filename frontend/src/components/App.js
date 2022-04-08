// import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate  } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import Home from "./Home";
import  Page from "./Page";
import  SignUp  from "./SignUp";
import  SignIn  from "./SignIn";
// import Header from './Header';
// import Footer from "./Footer";
import { getCurrentUser } from './Auth';
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
      console.log(res)

      if (res.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        console.log(res.data.data);
        console.log('current user');
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);


  // const userSignedIn = signIn();
  const currentUsers = getCurrentUser();
  const navigate = useNavigate();
  const PrivateRoute = ({ children }) => {
    if (!loading) {
      if (currentUsers) {
        return children;
      } else  {
        return navigate(`/sign_in`);;
      }
    } else {
      return <></>;
    }
  };


  return (
    <div>
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
      <Route exact path="/" element={< Page />} />
      <Route exact path="/sign_up" element={< SignUp /> } />
      <Route exact path="/sign_in" element={< SignIn />} />
      <Route exact path="/home" element={
        <PrivateRoute>
      < Home />
      </PrivateRoute>
      }/>
    </Routes>
    </AuthContext.Provider>
    </div>
  );
};

