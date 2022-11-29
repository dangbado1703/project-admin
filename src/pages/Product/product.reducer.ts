import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormDataProduct, IFormSearch } from "../../model/Product.model";

const initState = {
  dataProduct: [] as IFormDataProduct[],
  dataMake: [],
  dataProductType: [],
  dataCreated: [],
  dataName: [],
  dataCode: [],
  dataProductMake: [],
  dataDetail: {},
  action: "",
  totalElements: 0,
};

export const getAllProduct = createAsyncThunk(
  "product/createProduct",
  async (data: IFormSearch) => {
    const result = await instance.post("/api/v1/product/search", data);
    return result;
  }
);

export const getListMake = createAsyncThunk("product/getListMake", async () => {
  const result = await instance.get("/api/v1/make/get-list");
  const newResult = result.data.data.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return newResult;
});

export const getListProductType = createAsyncThunk(
  "product/getListProductType",
  async () => {
    const result = await instance.get("/api/v1/product-type/get-list");
    const newResult = result.data.data.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    return newResult;
  }
);

export const getListName = createAsyncThunk("product/getListName", async () => {
  const result = await instance.get(
    "/api/v1/product/suggestion?enums=PRODUCT_NAME&keySearch="
  );
  const newResult = result.data.data.name.map((item: any) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});

export const getListCode = createAsyncThunk("product/getListCode", async () => {
  const result = await instance.get(
    "/api/v1/product/suggestion?enums=PRODUCT_CODE&keySearch="
  );
  const newResult = result.data.data.code.map((item: any) => {
    return {
      value: item,
      label: item,
    };
  });
  return newResult;
});

export const getListCreated = createAsyncThunk(
  "product/getListCreated",
  async () => {
    const result = await instance.get(
      "/api/v1/product/suggestion?enums=PRODUCT_CREATED&keySearch="
    );
    const newResult = result.data.data.name.map((item: any) => {
      return {
        value: item,
        label: item,
      };
    });
    return newResult;
  }
);

export const getListProductMake = createAsyncThunk(
  "product/getListProductMake",
  async () => {
    const result = await instance.get(
      "/api/v1/product/suggestion?enums=PRODUCT_MAKE&keySearch="
    );
    const newResult = result.data.data.makeDTOS.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    return newResult;
  }
);

export const getDetail = createAsyncThunk(
  "product/getDetail",
  async (id: string) => {
    const result = await instance.get(`/api/v1/product/detail/${id}`);
    console.log("result", result);
    return result;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data:FormData) => {
    const result = await instance.post("/api/v1/product/update", data);
    return result;
  }
);

export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async (data: FormData) => {
    const result = await instance.post("/api/v1/product/create", data);
    return result;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    changeAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.dataProduct = action.payload.data.data.content;
        state.totalElements = action.payload.data.data.totalElements;
      })
      .addCase(getListMake.fulfilled, (state, action) => {
        state.dataMake = action.payload;
      })
      .addCase(getListProductType.fulfilled, (state, action) => {
        state.dataProductType = action.payload;
      })
      .addCase(getListName.fulfilled, (state, action) => {
        state.dataName = action.payload;
      })
      .addCase(getListCode.fulfilled, (state, action) => {
        state.dataCode = action.payload;
      })
      .addCase(getListCreated.fulfilled, (state, action) => {
        state.dataCreated = action.payload;
      })
      .addCase(getListProductMake.fulfilled, (state,action) => {
        state.dataProductMake = action.payload
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.dataDetail = action.payload.data.data;
      });
  },
});

const productReducer = productSlice.reducer;
export const { changeAction } = productSlice.actions;
export default productReducer;
