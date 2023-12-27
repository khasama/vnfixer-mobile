import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import instance from "../../configs/axios.config";
import { IRequest, IUser } from "../../constants/type";
type State = {
  requests: IRequest[] | null;
  requestTaked: IRequest | null;
};
const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: null,
    requestTaked: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequestsCanTake.fulfilled, (state, action) => {
        state.requests = action.payload.requests;
      })
      .addCase(takeRequest.fulfilled, (state, action) => {
        state.requestTaked = action.payload.request;
      })
      .addCase(getRequestTaked.fulfilled, (state, action) => {
        state.requestTaked = action.payload.request;
      });
  },
});

export const getRequestsCanTake = createAsyncThunk(
  "requests-take",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get(`/requests/requests-take`);
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

export const getRequestTaked = createAsyncThunk(
  "request-taked",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get(`/requests/request-taked`);
      if (res.status === 200) {
        return {
          request: res.data.data,
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

export const takeRequest = createAsyncThunk(
  "take-request",
  async ({ requestId }: { requestId: number }, { rejectWithValue }) => {
    try {
      const res = await instance.put(`/requests/take/${requestId}`);
      if (res.status === 200) {
        return {
          request: res.data.data,
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

export default requestSlice;
