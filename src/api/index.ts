import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
};

export const httpClient = axios.create(axiosConfig);

// const accessToken = "9e68677a-89d0-46a6-9196-7b79b3cb3eba";

// export const setAuthorizationHeader = () => {
//   httpClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
// };
