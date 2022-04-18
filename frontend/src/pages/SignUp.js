import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../components/App';
import { signUp } from '../apis/Auth';
import SignForm from '../components/SignForm';

const SignUp = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const signUpHandleSubmit = async (e) => {
    e.preventDefault();
    const generateParams = () => {
      const signUpParams = {
        name: name,
        nickname: nickname,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      };
      return signUpParams;
    };

    const params = generateParams();

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        console.log(res);
        setCurrentUser(res.data.data);
        navigate(`/home`);
        console.log('signed in successfully');
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="sign-in-form">
    <SignForm
      name={name}
      setName={setName}
      nickname={nickname}
      setNickName={setNickName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      passwordConfirmation={passwordConfirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      handleSubmit={signUpHandleSubmit}
      signType='signUp'
    />
    </div>
  );
};
export default SignUp;