import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../components/App';
import { signIn } from '../apis/Auth';
import SignForm from '../components/SignForm';
import '../stylesheets/Form.scss';

const SignIn = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickName] = useState('');

  const signInHandleSubmit = async (e) => {
    e.preventDefault();

    const generateParams = () => {
      const signUpParams = {
        nickname: nickname,
        email: email,
        password: password,
      };
      return signUpParams;
    };


    const params = generateParams();

    try {
      const res = await signIn(params);
      console.log(res)
      if (res.status === 200) {
   
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate('/home');
        console.log('signed in successfully');
      }
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <div className="sign-in-form">
    <SignForm
      nickname={nickname}
      setNickName={setNickName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={signInHandleSubmit}
      signType='signIn'
    />
    </div>
  );
};
export default SignIn;