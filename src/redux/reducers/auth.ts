import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import instance from "../../configs/axios.config";
import { IUser } from "../../constants/type";
type State = {
  isLoggedIn: boolean;
  currentUser: IUser | null;
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = null;
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
        return {
          user: res.data.user,
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
      const res = await instance.get(`/auth/logout`);
      if (res.status == 200) {
        if (res.data.status == "success") {
          await SecureStore.deleteItemAsync("access_token");
        } else {
          throw rejectWithValue(res.data.message);
        }
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
