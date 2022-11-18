import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { Key } from "antd/es/table/interface";
import { toast } from "react-toastify";
import instance from "../../contants/axios.config";
import { IFormDataStaff, IFormSearchStaff } from "../../model/Staff.model";

const initState = {
  dataStaff: [] as IFormDataStaff[],
  dataUsername: [],
  dataFullName: [],
  dataPhone: [],
  dataEmail: [],
  dataRole: [],
  totalItem: 0,
  isLoading: false,
  action: "",
};

const getDataFunc = async (type: string) => {
  const result = await instance.get(
    `/api/v1/user/suggestion?enums=${type}&keySearch=`
  );
  return result.data.data;
};

export const getUser = createAsyncThunk(
  "Staff/getUser",
  async (data: IFormSearchStaff) => {
    const result = await instance.post("/api/v1/user/search", data);
    return result;
  }
);

export const getUsername = createAsyncThunk("Staff/getUsername", async () => {
  const data = await getDataFunc("USER_NAME");
  const result = data.usernames.map((item: any) => ({
    label: item,
    value: item,
  }));
  return result;
});

export const getFullName = createAsyncThunk("Staff/getFullName", async () => {
  const result = await getDataFunc("USER_FULL_NAME");
  const data = result.fullNames.map((item: any) => ({
    label: item,
    value: item,
  }));
  return data;
});
export const getPhone = createAsyncThunk("Staff/getPhone", async () => {
  const result = await getDataFunc("USER_PHONE");
  const data = result.phone.map((item: any) => ({ label: item, value: item }));
  return data;
});

export const getEmail = createAsyncThunk("Staff/getEmail", async () => {
  const result = await getDataFunc("USER_EMAIL");
  const data = result.email.map((item: any) => ({ label: item, value: item }));
  return data;
});

export const getRole = createAsyncThunk("Staff/getRole", async () => {
  const result = await instance.get("/api/v1/role/get-role");
  const newArr = result.data.data.map((item: any) => ({
    label: item.name,
    value: item.roleId,
  }));
  return newArr;
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
export const addNewUser = createAsyncThunk(
  "Staff/addNewUser",
  async (data: any) => {
    const result = await instance.post("/api/v1/user/create", data);
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
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.dataStaff = action.payload.data.data.content;
        state.totalItem = action.payload.data.data.totalElements;
      })
      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        isFulfilled(getEmail, getFullName, getPhone, getUsername, getRole),
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
          if (action.type === "Staff/getRole/fulfilled") {
            state.dataRole = action.payload;
          }
        }
      );
  },
});

const staffReducer = staffSlice.reducer;
export const { changeAction } = staffSlice.actions;
export default staffReducer;
