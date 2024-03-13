import axios from 'axios';

let apiKey: string;
const accessToken: any = null;

export const SetUserAPIKey = (key: string) => {
  apiKey = key;
};

export const UpdateUserPayload = async (payload: any) => {
  const data = {
    payload: payload,
  };

  const response = await axios.post('/api/user/payload', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const GetUserPayload = async (access_token: any) => {
  const response = await axios.get('/api/user/payload', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};
