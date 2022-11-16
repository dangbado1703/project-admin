import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { Key } from "antd/lib/table/interface";
import { toast } from "react-toastify";
import instance from "../../contants/axios.config";
import { IFormDataStaff, IFormSearchStaff } from "../../model/Staff.model";

const initState = {
  dataStaff: [] as IFormDataStaff[],
  dataUsername: [],
  dataFullName: [],
  dataPhone: [],
  dataEmail: [],
  action: "",
};

const getDataFunc = async (type: string) => {
  const result = await instance.get(
    `/api/v1/user/suggestion?enums=${type}&keySearch=`
  );
  const newResult = result.data.data.map((item: any) => {
    return {
      label: item,
      value: item,
    };
  });
  return newResult;
};

export const getUser = createAsyncThunk(
  "Staff/getUser",
  async (data: IFormSearchStaff) => {
    const result = await instance.post("/api/v1/user/search", data);
    return result;
  }
);

export const getUsername = createAsyncThunk("Staff/getUsername", async () => {
  return await getDataFunc("USER_NAME");
});

export const getFullName = createAsyncThunk("Staff/getFullName", async () => {
  const result = await getDataFunc("USER_FULL_NAME");
  return result;
});
export const getPhone = createAsyncThunk("Staff/getPhone", async () => {
  return await getDataFunc("USER_PHONE");
});

export const getEmail = createAsyncThunk("Staff/getEmail", async () => {
  return await getDataFunc("USER_EMAIL");
});

export const deleteUser = createAsyncThunk(
  "Staff/deleteUser",
  async (id: Key[]) => {
    const result = await instance.post("/api/v1/user/delete", id);
    toast.success("Xóa thành công");
    return result;
  }
);

export const updateUser = createAsyncThunk(
  "Staff/updateUser",
  async (data: Partial<IFormDataStaff>) => {
    const result = await instance.post("/api/v1/user/update", data);
    return result;
  }
);
const staffSlice = createSlice({
  name: "Staff",
  initialState: initState,
  reducers: {
    changeAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.dataStaff = action.payload.data.data.content;
    });
    builder.addMatcher(
      isFulfilled(getEmail, getFullName, getPhone, getUsername),
      (state, action) => {
        if (action.type === "Staff/getEmail/fulfilled") {
          state.dataEmail = action.payload;
        }
        if (action.type === "Staff/getPhone/fulfilled") {
          state.dataPhone = action.payload;
        }
        if (action.type === "Staff/getFullName/fulfilled") {
          state.dataFullName = action.payload;
        }
        if (action.type === "Staff/getUsername/fulfilled") {
          state.dataUsername = action.payload;
        }
      }
    );
  },
});

const staffReducer = staffSlice.reducer;
export const { changeAction } = staffSlice.actions;
export default staffReducer;
