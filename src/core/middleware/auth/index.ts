import axios from 'axios';

import { Decrypted } from '../../../frontend/global/component/atoms/encrypt-decrypt';
import {
  GetAuthCodeWithToken,
  GetAuthCodeWithUsernameAndPassword,
  GetCookie,
  SetAuthBaseURL,
  SetCookie,
} from './auth';
import { GetUserPayload, SetUserAPIKey, UpdateUserPayload } from './user';

const baseURL = Decrypted(import.meta.env.VITE_AUTH_BASE_URL || undefined) || '';
const apiKey = Decrypted(import.meta.env.VITE_OAUTH_API_KEY || undefined) || '';

export const GetBaseURL = () => {
  return baseURL;
};

export const GetApiKey = () => {
  return apiKey;
};

export const MiddlewareAuthInit = async () => {
  console.log('OAuth2 Init: Auth');
  axios.defaults.baseURL = baseURL;
  SetAuthBaseURL(baseURL);
  SetUserAPIKey(apiKey);
};

export const MiddlewareAuth = {
  GetUserPayload,
  UpdateUserPayload,
  GetAuthCodeWithUsernameAndPassword,
  SetCookie,
  GetCookie,
  GetAuthCodeWithToken,
};
