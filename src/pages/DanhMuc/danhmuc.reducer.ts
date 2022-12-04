import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { Key } from "antd/es/table/interface";
import { toast } from "react-toastify";
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
  dataDetail:{},
  action: "",
  isLoading: false,
};

const getDataName = async (type: string) => {
  const result = await instance.get(
    `/api/v1/product-type/suggestion?enums=${type}&keyWord=`
  );
  const newResult = result.data.data.name.map((item: any) => {
    return {
      label: item,
      value: item,
    };
  });
  return newResult;
};
const getDataCode = async (type: string) => {
  const result = await instance.get(
    `/api/v1/product-type/suggestion?enums=${type}&keyWord=`
  );
  const newResult = result.data.data.code.map((item: any) => {
    return {
      label: item,
      value: item,
    };
  });
  return newResult;
};
const getDataCreatedBy = async (type: string) => {
  const result = await instance.get(
    `/api/v1/product-type/suggestion?enums=${type}&keyWord=`
  );
  const newResult = result.data.data.createdBy.map((item: any) => {
    return {
      label: item,
      value: item,
    };
  });
  return newResult;
};
const getDataParent = async (type: string) => {
  const result = await instance.get(
    `/api/v1/product-type/suggestion?enums=${type}&keyWord=`
  );
  const newResult = result.data.data.productTypeDTOS.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  return newResult;
};


export const getDanhMuc = createAsyncThunk(
  "DanhMuc/getDanhMuc",
  async (data: IFormSearchDanhMuc) => {
    const result = await instance.post("/api/v1/product-type/search", data);
    return result;
  }
);

export const getName = createAsyncThunk("DanhMuc/getName", async () => {
  return await getDataName("NAME");
});

export const getCode = createAsyncThunk("DanhMuc/getCode", async () => {
  const result = await getDataCode("CODE");
  return result;
});
export const getCreatedBy = createAsyncThunk(
  "DanhMuc/getCreatedBy",
  async () => {
    return await getDataCreatedBy("CREATED_BY");
  }
);

export const getParent = createAsyncThunk("DanhMuc/getParent", async () => {
  return await getDataParent("PARENT");
});

export const deleteDanhMuc = createAsyncThunk(
  "DanhMuc/deleteDanhMuc",
  async (id: Key[]) => {
    const result = await instance.post("/api/v1/product-type/delete", id);
    toast.success("Xóa thành công");
    return result;
  }
);
export const getDetail = createAsyncThunk(
  "DanhMuc/getDetail",
  async (id: string) => {
    const result = await instance.get(`/api/v1/product-type/detail/${id}`);
    console.log("result", result);
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
    }).addCase(createDanhMuc.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createDanhMuc.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(createDanhMuc.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getDetail.fulfilled, (state, action) => {
      state.dataDetail = action.payload.data.data;
    })
    ;
    builder.addMatcher(
      isFulfilled(getCode, getName, getCreatedBy, getParent),
      (state, action) => {
        if (action.type === "DanhMuc/getName/fulfilled") {
          state.dataName = action.payload;
        }
        if (action.type === "DanhMuc/getCode/fulfilled") {
          state.dataCode = action.payload;
        }
        if (action.type === "DanhMuc/getCreatedBy/fulfilled") {
          state.dataCreatedBy = action.payload;
        }
        if (action.type === "DanhMuc/getParent/fulfilled") {
          state.dataParent = action.payload;
        }
      }
    );
  },
});

const danhMucReducer = danhMucSlice.reducer;
export const { changeAction } = danhMucSlice.actions;
export default danhMucReducer;
