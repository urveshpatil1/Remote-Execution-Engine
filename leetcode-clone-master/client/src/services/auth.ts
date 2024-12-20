import axios from 'axios';
import { API_URL } from '../shared/apiEndPointURL';
import { SignInType, SignUpType } from '../interfaces';

export const signInService = async (requestBody: SignInType) => {
  const result = await axios
    .post(API_URL.signIn, requestBody)
    .then((response) => response)
    .catch((error) => {
      if (error.response.data.message) throw new Error(error.response.data.message);
      else throw new Error('Something went wrong!');
    });

  return result;
};

export const signUpService = async (requestBody: SignUpType) => {
  const result = await axios
    .post(API_URL.signUp, requestBody)
    .then((response) => response)
    .catch((error) => {
      if (error.response.data.message) throw new Error(error.response.data.message);
      else throw new Error('Something went wrong!');
    });

  return result;
};
