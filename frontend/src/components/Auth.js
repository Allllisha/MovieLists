import { api } from "./Axios";
import Cookies from 'js-cookie';


export const signUp = (params) => {
  return api.post('http://localhost:8080/api/v1/auth', params);
};

export const signIn = (params) => {
  return api.post('http://localhost:8080/api/v1/auth/sign_in', params);
};

export const signOut = () => {
  return api.delete('http://localhost:8080/api/v1/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return;
  return api.get('http://localhost:8080/api/v1/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      "client": Cookies.get('_client'),
      "uid": Cookies.get('_uid'),
    },
  });
};