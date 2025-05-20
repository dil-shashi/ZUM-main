import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REDUX_KEYS } from "@_helpers/constants";
import { AUTH, USER } from "@_helpers/apiConfig";
import { postRequest, getRequest, patchRequest } from "@_helpers/apicall";
import { deleteRequest } from "../../_helpers/apicall";

const defaultSelect = {
  isAuthenticated: false,
  user: {}
};

export const loginUser = createAsyncThunk(`${REDUX_KEYS.REDUX_USER}/loginUser`, (data, { rejectWithValue }) => {
  return postRequest({
    url: AUTH.login,
    data
  })
    .then((res) => res)
    .catch((err) => rejectWithValue(err));
});

export const signupUser = createAsyncThunk(`${REDUX_KEYS.REDUX_USER}/signupUser`, (data, { rejectWithValue }) => {
  return postRequest({
    url: AUTH.register,
    data
  })
    .then((res) => res)
    .catch((err) => rejectWithValue(err));
});

export const getUsers = createAsyncThunk(`${REDUX_KEYS.REDUX_USER}/users`, (data, { rejectWithValue }) => {
  return getRequest({
    url: USER.users,
    data
  })
    .then((res) => res)
    .catch((err) => rejectWithValue(err));
});

export const updateProfile = createAsyncThunk(`${REDUX_KEYS.REDUX_USER}/users`, (data, { rejectWithValue }) => {
  return patchRequest({
    url: USER.user(data.id),
    data
  })
    .then((res) => res)
    .catch((err) => rejectWithValue(err));
});

export const deleteProfile = createAsyncThunk(`${REDUX_KEYS.REDUX_USER}/users`, (data, { rejectWithValue }) => {
  return deleteRequest({
    url: USER.user(data.id)
  })
    .then((res) => res)
    .catch((err) => rejectWithValue(err));
});

export const user = createSlice({
  name: REDUX_KEYS.REDUX_USER,
  initialState: defaultSelect,
  reducers: {
    updateUser: (state, { payload }) => {
      return { ...state, auth: payload.auth };
    },
    logoutUser: () => {
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.data.data;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload.data.data };
    });
  }
});

// Action creators are generated for each case reducer function
export const { updateUser, logoutUser, resetSuccess } = user.actions;

export default user.reducer;
