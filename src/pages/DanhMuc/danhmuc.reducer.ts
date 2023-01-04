import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { Key } from "antd/es/table/interface";
import { toast } from "react-toastify";
import { isDebuggerStatement } from "typescript";
import instance from "../../contants/axios.config";
import {
  IFormDataDanhMuc,
  IFormSearchDanhMuc,
} from "../../model/DanhMuc.model";
import { IFormDataStaff, IFormSearchStaff } from "../../model/Staff.model";

const initState = {
  dataForm: [] as IFormDataDanhMuc[],
  dataName: [],
  dataCode: [],
  dataCreatedBy: [],
  dataParent: [],
  action: "" as "add" | "update" | 'view',
};
export const getDanhMuc = createAsyncThunk(
  "DanhMuc/getDanhMuc",
  async (data: IFormSearchDanhMuc) => {
    const result = await instance.post("/api/v1/product-type/search", data);
    return result;
  }
);

export const getName = createAsyncThunk("DanhMuc/getName", async () => {
  const result = await instance.get(
    "/api/v1/product-type/suggestion?enums=NAME&keyWord="
  );
  const newResult = result.data.data.name.map((item: any, index: number) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});
export const getCode = createAsyncThunk("DanhMuc/getCode", async () => {
  const result = await instance.get(
    "/api/v1/product-type/suggestion?enums=CODE&keyWord="
  );
  const newResult = result.data.data.code.map((item: any, index: number) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});
export const getCreatedBy = createAsyncThunk("DanhMuc/getCreatedBy", async () => {
  const result = await instance.get(
    "/api/v1/product-type/suggestion?enums=CREATED_BY&keyWord="
  );
  const newResult = result.data.data.createdBy.map((item: any, index: number) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});

export const getParent = createAsyncThunk("DanhMuc/getParent", async () => {
  const result = await instance.get(
    "/api/v1/product-type/suggestion?enums=PARENT&keyWord="
  );
  
  const newResult = result.data.data.productTypeDTOS.map((item: any, index: number) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return newResult;
});
export const deleteDanhMuc = createAsyncThunk(
  "DanhMuc/deleteDanhMuc",
  async (id: Key[]) => {
    const result = await instance.post("/api/v1/product-type/delete", id);
    toast.success("Xóa thành công");
    return result;
  }
);

export const updateDanhMuc = createAsyncThunk(
  "DanhMuc/updateDanhMuc",
  async (data: Partial<IFormDataDanhMuc>) => {
    const result = await instance.post("/api/v1/product-type/update", data);
    return result;
  }
);
export const createDanhMuc = createAsyncThunk(
  "DanhMuc/createDanhMuc",
  async (data: Partial<IFormDataDanhMuc>) => {
    const result = await instance.post("/api/v1/product-type/create", data);
    return result;
  }
);
const danhMucSlice = createSlice({
  name: "DanhMuc",
  initialState: initState,
  reducers: {
    changeAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getDanhMuc.fulfilled, (state, action) => {
      state.dataForm = action.payload.data.data.content;
    })
    .addCase(getCode.fulfilled, (state, action) => {
      state.dataCode = action.payload;
    })

    .addCase(getName.fulfilled, (state, action) => {
      state.dataName = action.payload;
    })
    .addCase(getCreatedBy.fulfilled, (state, action) => {
      state.dataCreatedBy = action.payload;
    })
    .addCase(getParent.fulfilled, (state, action) => {
      console.log("state", state);
      console.log("action", action.payload)
      state.dataParent = action.payload;
    })
  },
});

const danhMucReducer = danhMucSlice.reducer;
export const { changeAction } = danhMucSlice.actions;
export default danhMucReducer;
