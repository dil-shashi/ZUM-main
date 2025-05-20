const BASE_URL = "http://localhost:8080/api/v1";

export const AUTH = {
  login: `${BASE_URL}/auth/login/`,
  register: `${BASE_URL}/auth/register/`
};

export const USER = {
  users: `${BASE_URL}/users/`,
  user: (id) => `${BASE_URL}/users/${id}/`
};
