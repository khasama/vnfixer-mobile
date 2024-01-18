import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import instance from "../../configs/axios.config";
import { IRequest, IUser } from "../../constants/type";
import { registerForPushNotificationsAsync } from "../../utils/registerPushNotiToken";
import updateNotiToken from "../../api/updateNotiToken";
type State = {
  isLoggedIn: boolean;
  currentUser: IUser | null;
  myRequests: IRequest[] | null;
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    myRequests: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
      })
      .addCase(getMyRequests.fulfilled, (state, action) => {
        state.myRequests = action.payload.requests;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = null;
        state.myRequests = null;
      });
  },
});

export const login = createAsyncThunk(
  "login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await instance.post(`/auth/login`, { email, password });
      if (res.status === 200) {
        await SecureStore.setItemAsync("access_token", res.data.accessToken);
        const user = res.data.user as IUser;
        const token = await registerForPushNotificationsAsync();
        if (token && token !== user.mobileNotiToken) {
          await updateNotiToken(token);
        }
        return { user };
      } else {
        throw rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const getMyRequests = createAsyncThunk(
  "my-request",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get(`/requests/me`);
      if (res.status === 200) {
        return {
          requests: res.data.data,
        };
      } else {
        throw rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/auth/logout`);
      if (res.status == 200) {
        await SecureStore.deleteItemAsync("access_token");
      }
    } catch (error: any) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateInfo = createAsyncThunk(
  "updateInfo",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const res = await instance.put(`/users/information`, user);
      if (res.status == 200) {
        return {
          user: res.data,
        };
      } else {
        throw rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export default authSlice;
