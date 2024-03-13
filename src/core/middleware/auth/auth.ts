import axios from 'axios';

import {
  Decrypted,
  Encrypted,
} from '../../../frontend/global/component/atoms/encrypt-decrypt';
import { ICookie, ILogin } from '../types/auth';

let baseURL: string;

export const SetAuthBaseURL = (url: string) => {
  baseURL = url;
};

// error handling
export const SetCookie = async ({ cookieName, cookieValue, exDays }: ICookie) => {
  let expires = '';
  const encodedCookieValue = Encrypted(cookieValue);
  const date = new Date();
  date.setTime(date.getTime() + exDays * 24 * 60 * 60 * 1000);
  expires = '; expires=' + date.toUTCString();

  const secureAttribute = location.protocol === 'https:' ? '; secure' : '';
  document.cookie =
    cookieName + '=' + encodedCookieValue + expires + '; path=/' + secureAttribute + ';';
};

export const GetCookie = (cookieName: string) => {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

export const GetAuthCodeWithUsernameAndPassword = async ({
  username,
  password,
}: ILogin) => {
  axios.defaults.baseURL = baseURL;

  const response = await axios
    .post(
      '/api/auth/login',
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    )
    .catch((err) => {
      return err;
    });

  if (response.status !== 200) {
    return response;
  }

  SetCookie({ cookieName: 'token', cookieValue: response.data.token, exDays: 1 });

  return response.data;
};

export const GetAuthCodeWithToken = async (): Promise<{
  status: number;
  token: string;
}> => {
  axios.defaults.baseURL = baseURL;

  const { data } = await axios
    .get('/api/auth/token', {
      headers: {
        Authorization: `Bearer ${Decrypted(GetCookie('token'))}`,
      },
    })
    .catch((err) => err.response);

  return { status: data.statusCode, token: data.token };
};
