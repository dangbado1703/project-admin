import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Key } from "antd/lib/table/interface";
import instance from "../../contants/axios.config";
import {
  IFormDataClient,
  IFormSearchClient,
  IFormUpdate,
} from "../../model/Client.model";

const initState = {
  dataClient: [] as IFormDataClient[],
  dataUsername: [],
  dataEmail: [],
  dataPhone: [],
  totalElements: 0,
  action: "",
};

export const getClient = createAsyncThunk(
  "client/getClient",
  async (data: IFormSearchClient) => {
    const result = await instance.post("/api/v1/customer/search", data);
    return result;
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id: Key[]) => {
    const result = await instance.post("/api/v1/customer/delete", id);
    return result;
  }
);

export const getAllUsername = createAsyncThunk(
  "client/getAllUsername",
  async () => {
    const result = await instance.get(
      "/api/v1/customer/suggestion?enums=CUS_NAME&keySearch="
    );
    const newResult = result.data.data.map((item: any, index: number) => {
      return {
        value: item,
        label: item,
      };
    });
    return newResult;
  }
);

export const getAllEmail = createAsyncThunk("client/getAllEmail", async () => {
  const result = await instance.get(
    "/api/v1/customer/suggestion?enums=CUS_EMAIL&keySearch="
  );
  const newResult = result.data.data.map((item: any, index: number) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});

export const getAllPhone = createAsyncThunk("client/getAllPhone", async () => {
  const result = await instance.get(
    "/api/v1/customer/suggestion?enums=CUS_PHONE&keySearch="
  );
  const newResult = result.data.data.map((item: any, index: number) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data: IFormUpdate) => {
    const result = await instance.put("/api/v1/customer/update", data);
    return result;
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: initState,
  reducers: {
    changeAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getClient.fulfilled, (state, action) => {
        state.dataClient = action.payload.data.data.content;
        state.totalElements = action.payload.data.data.totalElements;
      })
      .addCase(getAllUsername.fulfilled, (state, action) => {
        state.dataUsername = action.payload;
      })
      .addCase(getAllEmail.fulfilled, (state, action) => {
        state.dataEmail = action.payload;
      })
      .addCase(getAllPhone.fulfilled, (state, action) => {
        state.dataPhone = action.payload;
      });
  },
});

const clientReducer = clientSlice.reducer;
export const { changeAction } = clientSlice.actions;
export default clientReducer;
